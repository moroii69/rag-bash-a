"use server";

import pdf from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
	try {
		const file = formData.get("pdf]") as File;

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const data = await pdf(buffer);

		if (!data.text || data.text.trim().length === 0) {
			return {
				success: false,
				message: "The uploaded PDF file contains no extractable text.",
			};
		}

		const chunks = await chunkContent(data.text);
		const embeddings = await generateEmbeddings(chunks);

		const records = chunks.map((chunk, index) => ({
			content: chunk,
			embedding: embeddings[index],
		}));

		await db.insert(documents).values(records);
		return {
			success: true,
			message: `created ${records.length} searchable chunks.`,
		};
	} catch (error) {
		console.error("Error processing PDF file:", error);
		return {
			success: false,
			message: "There was an error processing the PDF file.",
		};
	}
}
