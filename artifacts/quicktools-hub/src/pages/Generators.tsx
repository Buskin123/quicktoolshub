import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { QrCode, ArrowRight, Home, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/data/tools";

export default function Generators() {
  const categoryTools = tools.filter(t => ['qr-generator', 'password-generator'].includes(t.id));

  return (
    <Layout>
      <Helmet>
        <title>Free Generators — QR Code & Passwords | QuickToolsHub</title>
        <meta name="description" content="Generate QR codes and strong passwords instantly. Free, customizable, and browser-based — no account or installation required." />
      </Helmet>

      <div className="bg-gradient-to-br from-slate-600 to-slate-800 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Generators</h1>
          <p className="text-slate-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Generate QR codes and strong passwords instantly. Free, customizable, and browser-based — no account or installation required.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">Generators</span>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse Other Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/pdf-tools" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
              <span className="font-semibold text-gray-800 dark:text-gray-200">PDF Tools</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
            </Link>
            <Link href="/image-tools" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Image Tools</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
            </Link>
            <Link href="/calculators" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Calculators</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link href="/tools" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              View all tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
