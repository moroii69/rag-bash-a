"use server";

import { PDFParse } from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  const file = formData.get("pdf");
  if (!(file instanceof File)) {
    return { success: false, error: "No valid PDF file provided" };
  }

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
    return {
      success: false,
      error: "The uploaded PDF contains no extractable text",
    };
  }

  const chunks = await chunkContent(data.text);
  const embeddings = await generateEmbeddings(chunks);

  const records = chunks.map((chunk, index) => ({
    content: chunk,
    embedding: embeddings[index],
  }));

  try {
    await db.insert(documents).values(records);
  } catch (dbError) {
    return {
      success: false,
      error: "Failed to insert PDF chunks into database",
    };
  }

  return {
    success: true,
    message: `Created ${records.length} searchable chunks`,
  };
}
