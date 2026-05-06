import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>Terms & Conditions | QuickToolsHub</title>
        <meta name="description" content="QuickToolsHub Terms and Conditions — read our terms of service before using our free online tools." />
        <link rel="canonical" href="https://quicktoolshub.com/terms" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: May 2026</p>

        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {[
            ["1. Acceptance of Terms", "By using QuickToolsHub, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services."],
            ["2. Use of Services", "QuickToolsHub provides free browser-based tools for personal and commercial use. You may not use our tools for illegal activities, to process malicious files, or to violate third-party intellectual property rights."],
            ["3. No Warranties", "Our tools are provided 'as is' without any warranty of any kind. We do not guarantee that all tools will function perfectly in all browsers or for all file types."],
            ["4. Limitation of Liability", "QuickToolsHub shall not be liable for any direct, indirect, or consequential damages resulting from the use or inability to use our tools, including data loss or file corruption."],
            ["5. Intellectual Property", "All content on QuickToolsHub, including the website design, logo, and tool interfaces, is the intellectual property of QuickToolsHub and may not be reproduced without permission."],
            ["6. Advertising", "Our site displays third-party advertisements via Google AdSense and Monetag. We are not responsible for the content of these advertisements. Users interact with these advertisements at their own discretion."],
            ["7. Changes to Terms", "We reserve the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms."],
            ["8. Governing Law", "These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India."],
            ["9. Contact", "For questions about these Terms, contact us via Telegram: https://t.me/quicktoolshub"],
          ].map(([title, content]) => (
            <section key={title as string}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
              <p>{content}</p>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
