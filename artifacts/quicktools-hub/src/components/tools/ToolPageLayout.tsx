import { ReactNode, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Home, ChevronDown, ChevronUp, CheckCircle, Lightbulb, ArrowRight } from "lucide-react";
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
  tips?: string[];
  relatedIds?: string[];
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
  let relatedTools = tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);
  if (toolInfo?.relatedIds) {
    relatedTools = tools.filter(t => toolInfo.relatedIds?.includes(t.id));
  } else {
    const popularTools = tools.filter((t) => t.isPopular && t.category !== tool.category && t.id !== tool.id);
    const needed = 6 - relatedTools.length;
    if (needed > 0) {
      relatedTools = [...relatedTools, ...popularTools.slice(0, needed)];
    }
  }

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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <tool.icon className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">{tool.title}</h1>
            <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl mx-auto md:mx-0">{seoDescription || tool.description}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <a href="#tool-interface" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-colors shadow-sm">
                Use Tool Free <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-medium text-blue-100">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-300" /> Free</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-300" /> Secure</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-300" /> Browser Based</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-300" /> No Registration</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-indigo-900/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800 dark:text-gray-200 font-medium">{tool.title}</span>
      </nav>

      <div id="tool-interface" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 md:p-8 mb-8 shadow-sm transition-colors scroll-mt-24">
        {children}
      </div>

      <AdBanner size="leaderboard" className="mb-8" />

      {howToSteps && howToSteps.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How to Use {tool.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {howToSteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-3 relative">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold shadow-sm z-10">
                  {i + 1}
                </div>
                {i < howToSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[3.5rem] w-[calc(100%-2rem)] h-[2px] bg-blue-200 dark:bg-blue-800 -z-0"></div>
                )}
                <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {toolInfo && (
        <>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 mb-8 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What Does This Tool Do?</h2>
            <div className="space-y-4">
              {toolInfo.about.map((paragraph, i) => (
                <p key={i} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InfoCard title="Why Use This Tool?" items={toolInfo.whyUse} />
            <InfoCard title="Key Features" items={toolInfo.features} />
            <InfoCard title="Benefits" items={toolInfo.benefits} />
            <InfoCard title="Common Use Cases" items={toolInfo.useCases} />
          </div>

          {toolInfo.tips && toolInfo.tips.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-3xl p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-500" /> Tips & Best Practices
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {toolInfo.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/50">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {relatedTools.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} variant="compact" />
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {allFaqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-center text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Need Another Tool?</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">Explore our full collection of free online tools for all your document, image, and calculation needs.</p>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
            Explore All Tools <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50 z-0 pointer-events-none"></div>
      </div>
    </Layout>
  );
}
