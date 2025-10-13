import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  stepCountIs,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

const tools = {
  searchKnowledgeBase: tool({
    description:
      "Primary source: Search the internal knowledge base for verified information about Lords Institute.",
    inputSchema: z.object({
      query: z.string().describe("The search query."),
    }),
    execute: async ({ query }) => {
      console.log("Searching knowledge base:", query);
      try {
        const results = await searchDocuments(query, 3, 0.5);
        if (results.length === 0) {
          return "No relevant information found in internal database. Consider using Google Search.";
        }
        return results
          .map((r, i) => `Document ${i + 1}: ${r.content}`)
          .join("\n\n");
      } catch (error) {
        console.error("Knowledge base search failed:", error);
        throw new Error("Knowledge base search failed");
      }
    },
  }),
  google_search: google.tools.googleSearch({}),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      messages: convertToModelMessages(messages),
      tools,
      system: `You are bash-A, AI assistant for Lords Institute of Engineering & Technology.

TOOL USAGE PRIORITY:
1. ALWAYS try searchKnowledgeBase first for Lords Institute questions
2. Use google_search ONLY if:
   - Knowledge base returns no results
   - Question requires current web information
   - User explicitly asks for recent/online information

When using Google Search, include "Lords Institute of Engineering & Technology" in queries.

For greetings: respond warmly and offer help.
For unrelated topics: politely redirect to Lords Institute information.

--- STRICT RESPONSE FORMATTING ---
You MUST adhere to the following formatting rules for structured data to ensure maximum clarity. **NEVER use simple bullet points, numbered lists, or long paragraphs when a table is appropriate.**

1.  **Mandatory Tabular Data:** If the user asks for **fees, schedules, course details, faculty lists, or comparisons**, you **MUST** format the core information as a **Markdown table**.
    * **Example for Fees/Schedule:**
        | Program/Facility | Details | Timings/Fee |
        | :--- | :--- | :--- |
        | B.Tech | 4-year undergraduate | ~₹93,000/year |
        | College Hours | Classes and campus operations | 9:30 AM to 5:00 PM |
2.  **Code/Technical Snippets:** Use **Markdown code blocks** (e.g., \`\`\`language\ncode\n\`\`\`) for any code, configuration, or commands.
3.  **Simple Explanations:** Only use standard paragraph text for introductory sentences, explanations, disclaimers, or conclusions that do not fit the table format.

**Your primary objective is to make structured information easy to scan; therefore, tables are the preferred default format for multi-data-point responses.**`,
      stopWhen: [stepCountIs(10)],
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error streaming chat completion", { status: 500 });
  }
}
