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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">1. Introduction</h2>
            <p>QuickToolsHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at quicktoolshub.com.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">2. Information We Collect</h2>
            <p>We do not collect any files you process using our tools. All file processing happens locally in your browser. We may collect anonymous usage data such as page views and tool usage through analytics services like Google Analytics.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">3. File Processing & Privacy</h2>
            <p>All file operations (PDF conversion, image compression, etc.) are performed entirely within your browser. No files are transmitted to our servers. Your documents remain completely private.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">4. Cookies</h2>
            <p>We may use cookies for analytics and advertising purposes (Google AdSense, Monetag). These cookies help us understand site traffic and serve relevant ads. You can disable cookies through your browser settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">5. Advertising</h2>
            <p>We use Google AdSense and may use Monetag to display advertisements. These third-party ad networks may use cookies to serve ads based on your prior visits. For more information, see Google's advertising privacy policy.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">6. Third-Party Services</h2>
            <p>We may link to third-party services. We are not responsible for the privacy practices of those services and encourage you to review their policies.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">7. Data Security</h2>
            <p>Since we do not store your files or personal data on our servers, there is minimal risk of data breach. Any contact form submissions are handled securely.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-2">8. Contact</h2>
            <p>For privacy-related inquiries, contact us at: hello@quicktoolshub.com</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
