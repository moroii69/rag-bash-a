import {
	streamText,
	UIMessage,
	convertToModelMessages,
	tool,
	InferUITools,
	UIDataTypes,
  stepCountIs,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

const tools = {
	searchKnowledgeBase: tool({
		description:
			"Search the knowledge base for relevant information about Lords Institute of Engineering & Technology.",
		inputSchema: z.object({
			query: z
				.string()
				.describe("The search query to find relevant documents."),
		}),
		execute: async ({ query }) => {
			console.log(
				"Executing searchKnowledgeBase tool with query:",
				query
			);
			try {
				const results = await searchDocuments(query, 3, 0.5);

				if (results.length === 0) {
					console.log(
						"No results found in knowledge base for query:",
						query
					);
					return "No relevant information found in the database.";
				}

				const formattedResults = results
					.map((r, i) => `Document ${i + 1}: ${r.content}`)
					.join("\n\n");

				console.log(
					`Search results formatted for query: ${query}, results count: ${results.length}`
				);
				return formattedResults;
			} catch (error) {
				console.error(
					"Error searching knowledge base for query:",
					query,
					error
				);
				throw new Error("Knowledge base search failed");
			}
		},
	}),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
	try {
		const { messages }: { messages: ChatMessage[] } = await req.json();
		console.log("Received chat messages. Count:", messages.length);

		const result = streamText({
			model: google("gemini-2.5-flash-lite"),
			messages: convertToModelMessages(messages),
			tools,
			system: `You are bash-A, a helpful AI assistant for the Lords Institute of Engineering & Technology.

When users ask questions about Lords Institute (courses, faculty, admissions, timings, events, facilities, etc.), you MUST:
1. Use the searchKnowledgeBase tool to find relevant information
2. Base your answer on the search results
3. Keep responses concise and helpful

For greetings (hello, hi, hey), respond warmly and offer to help with Lords Institute information.

For topics unrelated to Lords Institute, politely say: "I'm specifically designed to help with information about Lords Institute of Engineering & Technology."

Always search the knowledge base before answering Lords Institute questions.`,
			stopWhen: stepCountIs(5),
		});

		console.log("Streaming chat response initiated");
		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Error streaming chat completion:", error);
		return new Response("Error streaming chat completion", { status: 500 });
	}
}
