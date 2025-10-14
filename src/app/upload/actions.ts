"use server";

import { PDFParse } from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf");
    if (!(file instanceof File)) {
      logger.error("No valid PDF file found in the request");
      return { success: false, error: "No valid PDF file provided" };
    }

    logger.info(
      { fileName: file.name, fileSize: file.size },
      "PDF file received",
    );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const parser = new PDFParse({ data: buffer });

    let data;
    try {
      data = await parser.getText();
    } finally {
      await parser.destroy();
    }

    if (!data.text || data.text.trim().length === 0) {
      logger.warn("PDF contains no extractable text");
      return {
        success: false,
        error: "The uploaded PDF contains no extractable text",
      };
    }

    logger.info({ textLength: data.text.length }, "PDF text extracted");

    const chunks = await chunkContent(data.text);
    const embeddings = await generateEmbeddings(chunks);

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    try {
      await db.insert(documents).values(records);
      logger.info(
        { chunkCount: records.length },
        "PDF chunks inserted into DB",
      );
    } catch (dbError) {
      logger.error({ dbError }, "Neon DB insert failed");
      return {
        success: false,
        error: "Failed to insert PDF chunks into database",
      };
    }

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    logger.error({ error }, "PDF processing error");
    return { success: false, error: "Failed to process PDF" };
  }
}
