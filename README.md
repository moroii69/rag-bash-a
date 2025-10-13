# bash-A: RAG Chatbot

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![Neon](https://img.shields.io/badge/Neon-DB-blueviolet?style=for-the-badge&logo=neon&logoColor=white)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

A Retrieval-Augmented Generation (RAG) chatbot powered by Next.js and Google Gemini. The application uses PDF documents, uploaded by an administrator, as a knowledge base to provide contextually aware, streaming responses to user queries.

---

## Features

-   **Role-Based Access**: Differentiates between `admin` and `user` roles.
-   **Admin-Only PDF Ingestion**: Admins can upload and process PDF files to build the knowledge base.
-   **RAG-Powered Chat**: The LLM uses a vector search over the document knowledge base to generate relevant answers.
-   **Streaming UI**: Responses are streamed token-by-token for a fluid chat experience.
-   **Vector Search**: Uses Neon serverless Postgres with an HNSW index for efficient semantic search.

---

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Authentication**: Clerk (handles user roles)
-   **Database**: Neon Serverless Postgres + `pgvector`
-   **ORM**: Drizzle ORM
-   **AI & Embeddings**: Google Gemini (`gemini-2.5-flash-lite`, `text-embedding-004`) via Vercel AI SDK
-   **Styling**: Tailwind CSS
-   **UI**: Shadcn UI & Vercel AI Elements

---

## Local Setup

### Prerequisites

-   Node.js (v18+)
-   Bun
-   Neon Account & Database URL
-   Clerk Account & Credentials
-   Google AI API Key

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/moroii69/rag-bash-a.git
    cd rag-bash-a
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure environment:**
    -   Copy `.env.example` to `.env.local`.
    -   Add your credentials for Neon, Clerk, and Google AI.
    ```bash
    cp .env.example .env.local
    ```

4.  **Sync database schema:**
    -   Ensure the `pgvector` extension is enabled on your Neon database.
    -   Push the schema.
    ```bash
    bun run db:push
    ```

5.  **Run the dev server:**
    ```bash
    bun run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## Environment Variables

Your `.env.local` must contain the following keys:

```env
# Neon Database
NEON_DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="..."
```
---

## Project Structure

Key files and directories in the project.

```
src
├── app/
│   ├── api/chat/route.ts   # Chat streaming endpoint
│   ├── chat/page.tsx       # Main chat UI for users
│   ├── upload/page.tsx     # Admin UI for PDF uploads
│   ├── upload/actions.ts   # Server action for PDF processing (admin only)
│   └── layout.tsx          # Root layout with auth provider
├── components/             # Reusable UI components
└── lib/
├── db-config.ts        # Database connection
├── db-schema.ts        # documents table schema
├── embeddings.ts       # Embedding generation logic
└── search.ts           # Vector search implementation
```

---

## CI Status & Tests

The project includes integration tests and CI checks for linting, database connectivity, and build steps.

-   [![Core Setup](https://img.shields.io/badge/Core%20Setup-Passing-green?style=flat-square)](https://github.com/moroii69/rag-bash-a/actions)
-   [![DB Check](https://img.shields.io/badge/DB%20Check-Passing-green?style=flat-square)](https://github.com/moroii69/rag-bash-a/actions)
-   [![Lint](https://img.shields.io/badge/Lint-Passing-green?style=flat-square)](https://github.com/moroii69/rag-bash-a/actions)

---

## Scripts

-   `bun run dev`: Start the dev server.
-   `bun run build`: Create a production build.
-   `bun run db:push`: Push Drizzle schema to the database.
-   `bun run lint`: Run the Biome linter.