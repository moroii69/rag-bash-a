"use client";

import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Navigation />
      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert prose-zinc max-w-none"
        >
          <h1 className="text-4xl font-light mb-8 text-white">
            Terms of Service
          </h1>
          <p className="text-zinc-400 text-sm mb-12">
            Effective Date: October 13, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              By accessing and using bash-A, you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to
              these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              2. Use of Service
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              bash-A is an AI chatbot service provided for informational and
              conversational purposes. You agree to use the service only for
              lawful purposes and in accordance with these terms.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              You must not use bash-A to:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc pl-6">
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Interfere with or disrupt the service or servers</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              3. Intellectual Property
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The service and its original content, features, and functionality
              are owned by bash-A and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              4. Disclaimer
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              bash-A is provided "as is" without warranties of any kind, either
              express or implied. We do not guarantee the accuracy,
              completeness, or usefulness of any information provided by the
              chatbot.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              5. Limitation of Liability
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              In no event shall bash-A be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              6. Changes to Terms
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We reserve the right to modify or replace these terms at any time.
              Continued use of the service after any changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">7. Contact</h2>
            <p className="text-zinc-400 leading-relaxed">
              If you have any questions about these Terms, please contact us
              through our GitHub repository.
            </p>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-8 mt-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <span>v1.0.2</span>
          <span>Last updated: October 2025</span>
        </div>
      </footer>
    </div>
  );
}
