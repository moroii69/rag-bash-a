import { Navigation } from "@/components/navigation";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-4 text-white">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-sm">
            Effective Date: October 13, 2025
          </p>
        </div>

        <section className="mb-16">
          <div className="space-y-12">
            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                1. Information We Collect
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm mb-3">
                bash-A is designed with privacy in mind. We collect minimal
                information necessary to provide our service:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Conversation logs (stored temporarily in your browser
                    session only)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Basic usage analytics (anonymous and aggregated)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Technical data such as browser type and device information
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                2. No Data Storage
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                We do not store your conversations or personal data on our
                servers. All chat history is maintained locally in your browser
                and is deleted when you close the session.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                3. How We Use Information
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm mb-3">
                Any information we collect is used solely to:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Provide and maintain our service
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Improve user experience
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Analyze usage patterns (anonymously)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-700 text-xs mt-1">→</span>
                  <p className="text-zinc-500 text-sm">
                    Detect and prevent technical issues
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                4. Third-Party Services
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                bash-A may use third-party services for analytics or
                functionality. These services have their own privacy policies,
                and we encourage you to review them.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                5. Cookies
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                We use minimal cookies only for essential functionality such as
                maintaining your session. We do not use tracking cookies for
                advertising purposes.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                6. Data Security
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                We implement appropriate security measures to protect against
                unauthorized access or disclosure of information. However, no
                method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                7. Your Rights
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Since we don't store personal data, there is no data to access,
                modify, or delete. Your conversations remain private and are
                automatically cleared when you end your session.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                8. Changes to Privacy Policy
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                We may update this privacy policy from time to time. We will
                notify users of any changes by updating the "Last updated" date
                at the top of this policy.
              </p>
            </div>

            <div className="border-l-2 border-zinc-800 pl-6">
              <h2 className="text-2xl font-light mb-4 text-white">
                9. Contact
              </h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                If you have any questions about this Privacy Policy, please
                contact us through our GitHub repository.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-900 pt-8">
          <a
            href="/chat"
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
