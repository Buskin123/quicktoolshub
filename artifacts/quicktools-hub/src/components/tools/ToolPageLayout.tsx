import { ReactNode, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Home, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { AdBanner } from "@/components/layout/AdBanner";
import { ToolCard } from "./ToolCard";
import { Tool, tools } from "@/data/tools";

export interface ToolInfo {
  about: string[];
  whyUse: string[];
  features: string[];
  benefits: string[];
  useCases: string[];
  faqs?: { q: string; a: string }[];
}

interface ToolPageLayoutProps {
  tool: Tool;
  children: ReactNode;
  seoDescription?: string;
  howToSteps?: string[];
  toolInfo?: ToolInfo;
}

const genericFaqs = [
  { q: "Is this tool free to use?", a: "Yes, completely free. All tools on QuickToolsHub are 100% free with no hidden charges, no subscriptions, and no credit card required." },
  { q: "Is my data safe and private?", a: "Absolutely. All processing happens directly in your browser — no files are ever uploaded to our servers. Your documents and data stay entirely on your device." },
  { q: "Do I need to sign up or create an account?", a: "No registration is required. Just open the tool and start using it immediately — no login, no account, no forms." },
  { q: "Does it work on mobile and tablet?", a: "Yes. QuickToolsHub is fully mobile-responsive and works on all modern smartphones, tablets, and desktop browsers." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-800 dark:text-gray-100 pr-4 text-sm">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3 bg-white dark:bg-gray-800">
          {a}
        </div>
      )}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-colors">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
      <BulletList items={items} />
    </div>
  );
}

export function ToolPageLayout({ tool, children, seoDescription, howToSteps, toolInfo }: ToolPageLayoutProps) {
  const relatedTools = tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);
  const allFaqs = [...(toolInfo?.faqs || []), ...genericFaqs];

  return (
    <Layout showSidebar>
      <Helmet>
        <title>{tool.title} - Free Online Tool | QuickToolsHub</title>
        <meta name="description" content={seoDescription || tool.description} />
        <meta property="og:title" content={`${tool.title} - Free Online Tool | QuickToolsHub`} />
        <meta property="og:description" content={seoDescription || tool.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://quicktoolshub.com${tool.path}`} />
      </Helmet>

      <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800 dark:text-gray-200 font-medium">{tool.title}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color}`}>
            <tool.icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{seoDescription || tool.description}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 shadow-sm transition-colors">
        {children}
      </div>

      <AdBanner size="leaderboard" className="mb-6" />

      {howToSteps && howToSteps.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">How to Use {tool.title}</h2>
          <ol className="space-y-3">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-gray-700 dark:text-gray-300 text-sm pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {relatedTools.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {toolInfo && (
        <>
          {/* About This Tool */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">About This Tool</h2>
            <div className="space-y-3">
              {toolInfo.about.map((paragraph, i) => (
                <p key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 2×2 info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <InfoCard title="Why Use This Tool?" items={toolInfo.whyUse} />
            <InfoCard title="Key Features" items={toolInfo.features} />
            <InfoCard title="Benefits" items={toolInfo.benefits} />
            <InfoCard title="Common Use Cases" items={toolInfo.useCases} />
          </div>
        </>
      )}

      {/* FAQ Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {allFaqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
