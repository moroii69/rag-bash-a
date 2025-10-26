"use client";
import { Navigation } from "@/components/navigation";
import { useState } from "react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-4 text-foreground">How It Works</h1>
          <p className="text-muted-foreground text-sm">
            RAG-powered semantic search with intelligent fallback
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-foreground">Core Process</h2>

          <div className="space-y-8">
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-light mb-2 text-foreground/90">01. Knowledge Upload</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Admins upload PDFs. System parses content, chunks it, and stores in Neon database.
                Each chunk gets a 768-dimensional vector embedding via Google AI.
              </p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-light mb-2 text-foreground/90">02. Query Processing</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Your message converts to an embedding. HNSW index performs cosine similarity search
                across stored vectors. Top relevant chunks retrieved.
              </p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-light mb-2 text-foreground/90">
                03. Response Generation
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Retrieved documents feed into LLM as context. AI generates response grounded in your
                data. Streams in real-time for responsive experience.
              </p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-light mb-2 text-foreground/90">04. Web Fallback</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                If knowledge base lacks info, system automatically searches the web. Ensures helpful
                answers beyond institutional data.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-foreground">Technology Stack</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">Framework</p>
              <p className="text-foreground/80 text-sm">Next.js + TypeScript</p>
            </div>
            <div className="border border-border p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">Database</p>
              <p className="text-foreground/80 text-sm">Neon + Drizzle ORM</p>
            </div>
            <div className="border border-border p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">Vector Search</p>
              <p className="text-foreground/80 text-sm">HNSW Index</p>
            </div>
            <div className="border border-border p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">AI Models</p>
              <p className="text-foreground/80 text-sm">Google AI SDK</p>
            </div>
            <div className="border border-border p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">Authentication</p>
              <p className="text-foreground/80 text-sm">Clerk</p>
            </div>
            <div className="border border-border p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">Embeddings</p>
              <p className="text-foreground/80 text-sm">768-dimensional vectors</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-foreground">Key Features</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground text-xs mt-1">→</span>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Semantic search via vector embeddings and cosine similarity
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground text-xs mt-1">→</span>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Real-time streaming responses for fluid conversations
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground text-xs mt-1">→</span>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Automatic web search fallback when local data insufficient
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground text-xs mt-1">→</span>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Admin-managed knowledge base with PDF upload support
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground text-xs mt-1">→</span>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Serverless architecture for automatic scaling
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 text-foreground">Data Flow</h2>

          <div className="border border-border p-6 bg-card">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Upload PDF</span>
              <span className="text-border">→</span>
              <span>Parse & Chunk</span>
              <span className="text-border">→</span>
              <span>Generate Embeddings</span>
              <span className="text-border">→</span>
              <span>Store in DB</span>
            </div>
            <div className="my-6 border-t border-border"></div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>User Query</span>
              <span className="text-border">→</span>
              <span>Embed Query</span>
              <span className="text-border">→</span>
              <span>Vector Search</span>
              <span className="text-border">→</span>
              <span>AI Response</span>
            </div>
          </div>
        </section>

        <div className="border-t border-border pt-8">
          <a
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← Back to chat
          </a>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-8 mt-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>v1.0.4</span>
          <span>Last updated: October 2025</span>
        </div>
      </footer>
    </div>
  );
}
