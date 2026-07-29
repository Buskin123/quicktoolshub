import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { FileText, ArrowRight, Home, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/data/tools";

export default function PdfTools() {
  const categoryTools = tools.filter(t => ['image-to-pdf', 'merge-pdf', 'compress-pdf', 'pdf-to-word'].includes(t.id));

  return (
    <Layout>
      <Helmet>
        <title>Free PDF Tools — Merge, Compress & Convert | QuickToolsHub</title>
        <meta name="description" content="Powerful PDF tools that run entirely in your browser. Merge, compress, convert, and extract text from PDF files without uploading them to any server." />
      </Helmet>

      <div className="bg-gradient-to-br from-red-600 to-red-800 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PDF Tools</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Powerful PDF tools that run entirely in your browser. Merge, compress, convert, and extract text from PDF files without uploading them to any server.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">PDF Tools</span>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse Other Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/image-tools" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Image Tools</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
            </Link>
            <Link href="/calculators" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Calculators</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
            </Link>
            <Link href="/generators" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Generators</span>
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
