import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | QuickToolsHub</title>
        <meta name="description" content="QuickToolsHub Privacy Policy — learn how we protect your data and privacy." />
        <link rel="canonical" href="https://quicktoolshub.com/privacy-policy" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">1. Introduction</h2>
            <p>QuickToolsHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">2. Information We Collect</h2>
            <p>We do not collect any files you process using our tools. All file processing happens locally in your browser. We may collect anonymous usage data such as page views and tool usage through analytics services like Google Analytics to help us understand how users interact with the site and improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">3. File Processing & Privacy</h2>
            <p>All file operations (PDF conversion, image compression, etc.) are performed entirely within your browser. No files are transmitted to our servers. Your documents remain completely private and are never stored, shared, or accessed by us.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">4. Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Analytics:</strong> Google Analytics uses cookies to collect anonymous traffic data such as page views, session duration, and device type. This helps us improve site performance and content.</li>
              <li><strong>Advertising:</strong> Google AdSense and Monetag use cookies to display relevant advertisements. These advertising cookies track your browsing activity across sites to serve personalised ads.</li>
            </ul>
            <p className="mt-2">You can disable cookies at any time through your browser settings. Note that disabling cookies may affect some site functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">5. Advertising</h2>
            <p>We use Google AdSense and may use Monetag to display advertisements on our website. These third-party ad networks may use cookies to serve ads based on your prior visits to this or other websites.</p>
            <p className="mt-3">Google may use personalised advertising cookies to serve ads based on your interests and previous visits to this or other websites. Users may opt out of personalised advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.</p>
            <p className="mt-3">For more information on how Google uses data when you use our site, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy & Terms</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">6. Third-Party Services</h2>
            <p>We may link to or integrate third-party services including Google Analytics, Google AdSense, and Monetag. We are not responsible for the privacy practices of those services and encourage you to review their individual privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">7. Data Security</h2>
            <p>Since we do not store your files or personal data on our servers, there is minimal risk of a data breach related to your documents. We take reasonable measures to ensure the site itself is served securely over HTTPS.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">8. Contact</h2>
            <p>
              For privacy-related inquiries, contact us via Telegram:{" "}
              <a
                href="https://t.me/quicktoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://t.me/quicktoolshub
              </a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
