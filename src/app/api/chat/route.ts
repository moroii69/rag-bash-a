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
import pino from "pino";

// initialise logger
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

const tools = {
  searchKnowledgeBase: tool({
    description: "Search the knowledge base for relevant information.",
    inputSchema: z.object({
      query: z
        .string()
        .describe("The search query to find relevant documents."),
    }),
    execute: async ({ query }) => {
      logger.info({ query }, "Executing searchKnowledgeBase tool");
      try {
        const results = await searchDocuments(query, 3, 0.5);

        if (results.length === 0) {
          logger.info({ query }, "No results found in knowledge base");
          return "No relevant info found in the database.";
        }

        const formattedResults = results
          .map((r, i) => `${i + 1}: ${r.content}`)
          .join("\n\n");

        logger.info(
          { query, resultsCount: results.length },
          "Search results formatted"
        );
        return formattedResults;
      } catch (error) {
        logger.error({ query, error }, "Error searching knowledge base");
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
    logger.info({ messageCount: messages.length }, "Received chat messages");

    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      messages: convertToModelMessages(messages),
      tools,
      system: `
			You are an AI assistant specialized in providing accurate answers from the Lords Institute of Engineering & Technology knowledge base. 
			If the information is available, provide it concisely and accurately. 
			If the information is not available, use the provided tool to search the knowledge base. 
			For queries unrelated to the Lords Institute of Engineering & Technology, respond with: "I am only able to provide information pertaining to the Lords Institute of Engineering & Technology." 
			Do not speculate or provide information outside the knowledge base.`,
      stopWhen: stepCountIs(2),
    });

    logger.info("Streaming chat response initiated");
    return result.toUIMessageStreamResponse();
  } catch (error) {
    logger.error({ error }, "Error streaming chat completion");
    return new Response("Error streaming chat completion", { status: 500 });
  }
}