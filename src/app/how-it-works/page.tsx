"use client";
import { Navigation } from "@/components/navigation";
import { useState } from "react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-4 text-white">How It Works</h1>
          <p className="text-zinc-500 text-sm">
            RAG-powered semantic search with intelligent fallback
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-white">Core Process</h2>

          <div className="space-y-8">
            <div className="border-l-2 border-zinc-800 pl-6">
              <h3 className="text-lg font-light mb-2 text-zinc-300">
                01. Knowledge Upload
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Admins upload PDFs. System parses content, chunks it, and stores
                in Neon database. Each chunk gets a 768-dimensional vector
                embedding via Google AI.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h3 className="text-lg font-light mb-2 text-zinc-300">
                02. Query Processing
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Your message converts to an embedding. HNSW index performs
                cosine similarity search across stored vectors. Top relevant
                chunks retrieved.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h3 className="text-lg font-light mb-2 text-zinc-300">
                03. Response Generation
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Retrieved documents feed into LLM as context. AI generates
                response grounded in your data. Streams in real-time for
                responsive experience.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h3 className="text-lg font-light mb-2 text-zinc-300">
                04. Web Fallback
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                If knowledge base lacks info, system automatically searches the
                web. Ensures helpful answers beyond institutional data.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-white">
            Technology Stack
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-zinc-900 p-4">
              <p className="text-xs text-zinc-600 mb-1">Framework</p>
              <p className="text-zinc-400 text-sm">Next.js + TypeScript</p>
            </div>
            <div className="border border-zinc-900 p-4">
              <p className="text-xs text-zinc-600 mb-1">Database</p>
              <p className="text-zinc-400 text-sm">Neon + Drizzle ORM</p>
            </div>
            <div className="border border-zinc-900 p-4">
              <p className="text-xs text-zinc-600 mb-1">Vector Search</p>
              <p className="text-zinc-400 text-sm">HNSW Index</p>
            </div>
            <div className="border border-zinc-900 p-4">
              <p className="text-xs text-zinc-600 mb-1">AI Models</p>
              <p className="text-zinc-400 text-sm">Google AI SDK</p>
            </div>
            <div className="border border-zinc-900 p-4">
              <p className="text-xs text-zinc-600 mb-1">Authentication</p>
              <p className="text-zinc-400 text-sm">Clerk</p>
            </div>
            <div className="border border-zinc-900 p-4">
              <p className="text-xs text-zinc-600 mb-1">Embeddings</p>
              <p className="text-zinc-400 text-sm">768-dimensional vectors</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-white">Key Features</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-zinc-700 text-xs mt-1">→</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Semantic search via vector embeddings and cosine similarity
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-700 text-xs mt-1">→</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Real-time streaming responses for fluid conversations
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-700 text-xs mt-1">→</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Automatic web search fallback when local data insufficient
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-700 text-xs mt-1">→</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Admin-managed knowledge base with PDF upload support
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-700 text-xs mt-1">→</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Serverless architecture for automatic scaling
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-white">Data Flow</h2>

          <div className="border border-zinc-900 p-6">
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span>Upload PDF</span>
              <span className="text-zinc-800">→</span>
              <span>Parse & Chunk</span>
              <span className="text-zinc-800">→</span>
              <span>Generate Embeddings</span>
              <span className="text-zinc-800">→</span>
              <span>Store in DB</span>
            </div>
            <div className="my-6 border-t border-zinc-900"></div>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span>User Query</span>
              <span className="text-zinc-800">→</span>
              <span>Embed Query</span>
              <span className="text-zinc-800">→</span>
              <span>Vector Search</span>
              <span className="text-zinc-800">→</span>
              <span>AI Response</span>
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-900 pt-8">
          <a
            href="/"
            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            ← Back to chat
          </a>
        </div>
      </main>

      <footer className="border-t border-zinc-900 px-6 py-8 mt-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-zinc-700">
          <span>v1.0.3</span>
          <span>Last updated: October 2025</span>
        </div>
      </footer>
    </div>
  );
}
