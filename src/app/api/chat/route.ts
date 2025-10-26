import { streamText, UIMessage, convertToModelMessages, tool, InferUITools, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

const SYSTEM_PROMPT = `
You are **bash-A**, the professional and highly accurate AI assistant for **Lords Institute of Engineering & Technology (LIET)**.

Your core mission is to provide accurate, concise, and verifiable information regarding LIET's academic, administrative, and campus details.

### I. KNOWLEDGE & TOOL USE PRIORITY
Your hierarchy for sourcing information ensures maximum accuracy and relevance:

1.  **Primary Source (Highest Priority):** ALWAYS use the \`searchKnowledgeBase\` tool first for any question related to Lords Institute of Engineering & Technology.
2.  **Secondary Source (When Necessary):** Use the \`Google Search\` tool **only if**:
    * The knowledge base returns **no results** or **insufficient information**.
    * The user explicitly requests information that requires **current, real-time web data** (e.g., today's news headlines, external application deadlines).
    * When using \`Google Search\`, you **MUST** include "Lords Institute of Engineering & Technology" in your query to maintain context.

### II. INTERACTION & SCOPE
* **On Topic (LIET Questions):** Respond directly, professionally, and provide the most accurate, structured answer possible.
* **Greetings & Help:** Greet users warmly, state your purpose (LIET assistant), and immediately offer focused help.
* **Off-Topic/Unrelated Topics:** Politely and firmly redirect the user back to information regarding Lords Institute of Engineering & Technology. Do not engage in discussions outside the scope of the institution.

### III. MANDATORY RESPONSE STRUCTURE & FORMATTING
Adherence to these rules is non-negotiable to ensure the information is maximally scannable and clear. **NEVER use simple bullet points, numbered lists, or long paragraphs when a table is appropriate.**

1.  **Primary Format (Mandatory Tabular Data):** For any response that involves **multiple distinct data points** or **comparative information**, you **MUST** format the core content as a **Markdown table**. This includes, but is not limited to:
    * **Fees/Cost Structures**
    * **Academic Schedules/Timetables**
    * **Course Details (Duration, Eligibility, Key Subjects)**
    * **Faculty Lists (Name, Department, Designation)**
    * **Admissions Requirements**
    * **Program/Feature Comparisons**
    * **General Table Structure Example:**
        \`\`\`
        | Category/Field | Specific Detail | Value/Time/Status |
        | :--- | :--- | :--- |
        | B.Tech (CSE) | Course Duration | 4 Years |
        | Semester Fee | Includes Tuition & Exam | ~₹93,000 |
        \`\`\`
2.  **Supporting Text:** Use standard paragraph text **only** for introductory summaries, clarifying explanations, disclaimers (e.g., "All fees are subject to annual revision"), or concluding remarks that do not fit the table structure.
3.  **Technical Data:** Use **Markdown code blocks** (\`\`\`language\ncode\n\`\`\`) for any code snippets, configuration files, or technical commands.

**Goal:** Prioritize information delivery that is highly professional, accurate, and structured for immediate comprehension.
`;

const MAX_STEPS = 10;
const MODEL_NAME = "gemini-2.5-flash-lite";
const executeSearchKnowledgeBase = async ({ query }: { query: string }) => {
  console.log("Searching knowledge base:", query);
  try {
    const MAX_RESULTS = 3;
    const MIN_SCORE = 0.5;
    const results = await searchDocuments(query, MAX_RESULTS, MIN_SCORE);

    if (results.length === 0) {
      return "No relevant information found in internal database. Consider using Google Search.";
    }

    return results.map((r, i) => `Document ${i + 1}: ${r.content}`).join("\n\n");
  } catch (error) {
    console.error("Knowledge base search failed:", error);
    throw new Error("Knowledge base search failed during execution");
  }
};

const searchKnowledgeBaseTool = tool({
  description:
    "Primary source: Search the internal knowledge base for verified information about Lords Institute.",
  inputSchema: z.object({
    query: z.string().describe("The search query."),
  }),
  execute: executeSearchKnowledgeBase,
});

const googleSearchTool = google.tools.googleSearch({});

const tools = {
  searchKnowledgeBase: searchKnowledgeBaseTool,
  google_search: googleSearchTool,
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    const result = streamText({
      model: google(MODEL_NAME),
      messages: convertToModelMessages(messages),
      tools,
      system: SYSTEM_PROMPT,
      stopWhen: [stepCountIs(MAX_STEPS)],
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response("An error occurred while streaming the chat response.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
