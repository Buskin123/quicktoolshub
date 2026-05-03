import { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { AdBanner } from "@/components/layout/AdBanner";
import { ToolCard } from "./ToolCard";
import { Tool, tools } from "@/data/tools";

interface ToolPageLayoutProps {
  tool: Tool;
  children: ReactNode;
  seoDescription?: string;
  howToSteps?: string[];
}

export function ToolPageLayout({ tool, children, seoDescription, howToSteps }: ToolPageLayoutProps) {
  const relatedTools = tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

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

      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-medium">{tool.title}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color}`}>
            <tool.icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tool.title}</h1>
            <p className="text-sm text-gray-500">{tool.category}</p>
          </div>
        </div>
        <p className="text-gray-600">{seoDescription || tool.description}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        {children}
      </div>

      <AdBanner size="leaderboard" className="mb-6" />

      {howToSteps && howToSteps.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">How to Use {tool.title}</h2>
          <ol className="space-y-3">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {relatedTools.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
