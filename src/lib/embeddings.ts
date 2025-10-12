import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

const model = google.textEmbeddingModel("text-embedding-004");

export async function generateEmbedding(text: string) {
	const { embedding } = await embed({
		model,
		value: text.replace(/\n/g, " "),
	});
	return embedding;
}

export async function generateEmbeddings(texts: string[]) {
	const { embeddings } = await embedMany({
		model,
		values: texts.map((t) => t.replace(/\n/g, " ")),
	});
	return embeddings;
}
