import { Navigation } from "@/components/navigation";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-4 text-white">
            Terms of Service
          </h1>
          <p className="text-zinc-500 text-sm">
            Effective Date: October 13, 2025
          </p>
        </div>

        <section className="mb-16">
          <div className="space-y-12">
            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                By accessing and using bash-A, you accept and agree to be bound
                by the terms and provision of this agreement. If you do not
                agree to these terms, please do not use our service.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                2. Use of Service
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm mb-4">
                bash-A is an AI chatbot service provided for informational and
                conversational purposes. You agree to use the service only for
                lawful purposes and in accordance with these terms.
              </p>
              <p className="text-zinc-500 leading-relaxed text-sm mb-3">
                You must not use bash-A to:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Violate any applicable laws or regulations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Harass, abuse, or harm another person
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Attempt to gain unauthorized access to the service
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Interfere with or disrupt the service or servers
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                3. Intellectual Property
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                The service and its original content, features, and
                functionality are owned by bash-A and are protected by
                international copyright, trademark, and other intellectual
                property laws.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                4. Disclaimer
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                bash-A is provided "as is" without warranties of any kind,
                either express or implied. We do not guarantee the accuracy,
                completeness, or usefulness of any information provided by the
                chatbot.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                5. Limitation of Liability
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                In no event shall bash-A be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your
                use of or inability to use the service.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                6. Changes to Terms
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                We reserve the right to modify or replace these terms at any
                time. Continued use of the service after any changes constitutes
                acceptance of the new terms.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                7. Contact
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                If you have any questions about these Terms, please contact us
                through our GitHub repository.
              </p>
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
