import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Last updated: February 22, 2026
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Clipio (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a
            browser extension available for Chrome and Firefox (the
            &quot;Extension&quot;). This Privacy Policy explains how we handle
            your information when you use Clipio.
          </p>

          <p className="mb-8">
            By installing or using the Extension, you agree to this Privacy
            Policy.
          </p>

          <hr className="my-10 border-slate-200" />

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-medium mb-3 text-slate-700">
              a. Snippet Data (stored locally on your device)
            </h3>
            <p className="mb-4">
              All snippets you create — including their shortcut, label,
              content, and tags — are stored exclusively on your device using
              the browser&apos;s built-in{" "}
              <code className="bg-slate-100 px-1 rounded text-pink-600">
                storage.sync
              </code>{" "}
              and
              <code className="bg-slate-100 px-1 rounded text-pink-600">
                storage.local
              </code>{" "}
              APIs. Snippet data may be synced across your own devices by the
              browser&apos;s native sync infrastructure (e.g., Chrome Sync or
              Firefox Sync) if you are signed in to your browser; this sync is
              performed directly by the browser and is outside Clipio&apos;s
              control.
            </p>
            <p className="font-semibold text-slate-900 mb-6">
              We never transmit your snippet content to our servers.
            </p>

            <h3 className="text-xl font-medium mb-3 text-slate-700">
              b. Error and Diagnostic Data
            </h3>
            <p className="mb-4">
              To detect and fix bugs we collect anonymized error reports through
              Sentry (see Section 4). Error reports may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Error type and error message</li>
              <li>
                Stack trace (file and line number references within the
                extension&apos;s own code)
              </li>
              <li>
                The extension context where the error occurred (background,
                popup, options, or content script)
              </li>
              <li>
                The operation that triggered the error (e.g.,{" "}
                <code className="bg-slate-100 px-1">loadSnippets</code>)
              </li>
              <li>
                Snippet shortcut text and snippet label (e.g.,{" "}
                <code className="bg-slate-100 px-1">;gr</code> or &quot;Greeting
                template&quot;)
              </li>
              <li>
                Storage mode (<code className="bg-slate-100 px-1">sync</code> or{" "}
                <code className="bg-slate-100 px-1">local</code>)
              </li>
              <li>Extension version and release identifier</li>
            </ul>

            <div className="bg-slate-50 border-l-4 border-slate-400 p-4 mb-4">
              <p className="font-bold mb-2">
                The following data is never included in error reports:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Snippet body content</li>
                <li>Clipboard contents</li>
                <li>The URLs of pages you visit in your browser</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">We use diagnostic data solely to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Detect and fix bugs and technical errors in the Extension</li>
              <li>Improve performance and reliability</li>
              <li>Detect technical issues that could affect users</li>
            </ul>
            <p className="mt-4 italic">
              We do not use your data for advertising, profiling, or any purpose
              other than maintaining a functional, reliable extension.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              3. Data Storage
            </h2>
            <p>
              All snippet data is stored locally on your device. Clipio does not
              operate a backend server that receives or stores your snippets.
              The Extension also maintains a local IndexedDB backup of your
              snippets on your device as a recovery mechanism in case of
              accidental data loss.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              4. Third-Party Services
            </h2>
            <p className="mb-6">
              We use <strong>Sentry</strong> (sentry.io) exclusively for error
              monitoring in the Extension. No other third-party analytics or
              tracking service is used.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 px-4 py-2 text-left">
                      Service
                    </th>
                    <th className="border border-slate-200 px-4 py-2 text-left">
                      Purpose
                    </th>
                    <th className="border border-slate-200 px-4 py-2 text-left">
                      Privacy Policy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2 font-medium">
                      Sentry
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      Error monitoring and diagnostics
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      <a
                        href="https://sentry.io/privacy"
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        sentry.io/privacy
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-600">
              Sentry is a U.S.-based company that complies with GDPR through
              Standard Contractual Clauses (SCCs). Error reports are retained
              for <strong>90 days</strong> and then automatically deleted.
            </p>
          </section>

          {/* Section 5 & 6 (Combined for brevity in this example) */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              5. Legal Bases for Processing (GDPR)
            </h2>
            <p className="mb-8">
              If you are in the European Economic Area (EEA), our legal basis
              for processing diagnostic error data is
              <strong> legitimate interest</strong> — detecting and fixing
              software defects to maintain a reliable and secure extension.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              6. Your Rights
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-2">European Union (GDPR)</h4>
                <p className="text-sm">
                  Access, correct, delete, restrict, or port your data, and
                  withdraw consent.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">United States (CCPA)</h4>
                <p className="text-sm">
                  Request info on collection, deletion of data, and confirm data
                  is not sold.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Colombia (Ley 1581)</h4>
                <p className="text-sm">
                  Know, update, and correct data. Request proof of authorization
                  or deletion via SIC.
                </p>
              </div>
            </div>
            <p className="mt-6 text-center">
              Contact us at:{" "}
              <a
                href="mailto:privacy@clipio.xyz"
                className="text-blue-600 font-medium"
              >
                privacy@clipio.xyz
              </a>
            </p>
          </section>

          {/* Final Sections */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-800">
                7. Data Security
              </h2>
              <p>
                All snippet data remains on your device. We automatically strip
                all snippet body content and clipboard data before transmission
                of error reports.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-800">
                8. Children&apos;s Privacy
              </h2>
              <p>
                The Extension is not intended for users under the age of 13. We
                do not knowingly collect personal data from children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-800">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy occasionally. Continued use
                constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="bg-slate-100 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-2 text-slate-800">
                10. Contact
              </h2>
              <p>For any questions or requests regarding privacy:</p>
              <a
                href="mailto:privacy@clipio.xyz"
                className="text-xl text-blue-600 font-bold hover:underline"
              >
                privacy@clipio.xyz
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
