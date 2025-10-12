import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

const model = google.textEmbedding("google-embed-text-001");

export async function generateEmbedding(text: string) {
	const { embedding } = await embed({
		model,
		value: text.replace("\n", " "),
	});
	return embedding;
}

export async function generateEmbeddings(texts: string[]) {
	const { embeddings } = await embedMany({
		model,
		values: texts.map((t) => t.replace("\n", " ")),
	});
	return embeddings;
}
