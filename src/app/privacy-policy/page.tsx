"use client";

import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-sm mb-12">
            Effective Date: October 13, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              1. Information We Collect
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              bash-A is designed with privacy in mind. We collect minimal
              information necessary to provide our service:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc pl-6">
              <li>
                Conversation logs (stored temporarily in your browser session
                only)
              </li>
              <li>Basic usage analytics (anonymous and aggregated)</li>
              <li>
                Technical data such as browser type and device information
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              2. No Data Storage
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We do not store your conversations or personal data on our
              servers. All chat history is maintained locally in your browser
              and is deleted when you close the session.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              3. How We Use Information
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Any information we collect is used solely to:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc pl-6">
              <li>Provide and maintain our service</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns (anonymously)</li>
              <li>Detect and prevent technical issues</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              4. Third-Party Services
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              bash-A may use third-party services for analytics or
              functionality. These services have their own privacy policies, and
              we encourage you to review them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">5. Cookies</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We use minimal cookies only for essential functionality such as
              maintaining your session. We do not use tracking cookies for
              advertising purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              6. Data Security
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We implement appropriate security measures to protect against
              unauthorized access or disclosure of information. However, no
              method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              7. Your Rights
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Since we don't store personal data, there is no data to access,
              modify, or delete. Your conversations remain private and are
              automatically cleared when you end your session.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">
              8. Changes to Privacy Policy
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will
              notify users of any changes by updating the "Last updated" date at
              the top of this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4 text-white">9. Contact</h2>
            <p className="text-zinc-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through our GitHub repository.
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
