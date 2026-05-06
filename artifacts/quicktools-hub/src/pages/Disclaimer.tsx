import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

export default function Disclaimer() {
  return (
    <Layout>
      <Helmet>
        <title>Disclaimer | QuickToolsHub</title>
        <meta name="description" content="QuickToolsHub Disclaimer — read our disclaimer regarding tool accuracy and usage." />
        <link rel="canonical" href="https://quicktoolshub.com/disclaimer" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: May 2026</p>

        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          {[
            ["General Disclaimer", "The information and tools provided on QuickToolsHub are for general informational and utility purposes only. While we strive to keep all tools accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of any tool or information on this website."],
            ["Calculator Tools", "Our calculators (EMI, GST, Age, Percentage) are intended for informational purposes only. Results should not be used as a substitute for professional financial, legal, or mathematical advice. Always verify results with qualified professionals before making financial decisions."],
            ["File Conversion Tools", "PDF and image conversion results may vary depending on the original file quality and browser capabilities. We cannot guarantee perfect fidelity in all cases. Always keep original copies of your important documents."],
            ["No Professional Advice", "Nothing on QuickToolsHub constitutes professional financial, legal, or technical advice. Always consult relevant professionals for important decisions."],
            ["External Links", "QuickToolsHub may contain links to external websites. We have no control over the content or nature of those sites and accept no responsibility for any loss or damage that may arise from using them."],
            ["Limitation of Liability", "In no event shall QuickToolsHub be liable for any loss or damage including without limitation, indirect or consequential loss or damage arising out of or in connection with the use of this website or its tools."],
            ["Advertising Disclaimer", "This website displays advertisements provided by third-party ad networks such as Google AdSense. We do not control the content of these ads and are not responsible for any claims, products, or services advertised."],
            ["Changes", "We reserve the right to update this Disclaimer at any time. Changes will be reflected on this page. Your continued use of the website constitutes acceptance of any changes."],
            ["Contact", "For any questions regarding this Disclaimer, please contact us via Telegram: https://t.me/quicktoolshub"],
          ].map(([title, content]) => (
            <section key={title as string}>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
              <p>{content}</p>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
