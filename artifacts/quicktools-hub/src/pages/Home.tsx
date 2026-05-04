import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Shield, Zap, Lock, Globe, ChevronDown, ChevronUp, FileText, Image, Calculator } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdBanner } from "@/components/layout/AdBanner";
import { tools } from "@/data/tools";

const faqs = [
  { q: "Are these tools free to use?", a: "Yes, all tools are completely free to use. There are no hidden charges, no subscription plans, and no credit card required — ever." },
  { q: "Is my data safe?", a: "Yes, most tools process files locally in your browser and do not store, upload, or share your data with any server. Your files stay entirely on your device." },
  { q: "Do I need to sign up?", a: "No signup is required. Simply open the tool you need and start using it instantly — no account, no login, no forms." },
  { q: "Does it work on mobile?", a: "Yes, the site is fully mobile-friendly and works on all modern smartphones and tablets." },
  { q: "What tools are available?", a: "QuickToolsHub offers PDF tools (merge, compress, convert), image tools (compressor, JPG/PNG converter), calculators (EMI, GST, age, percentage), and generators (QR code, password)." },
  { q: "What is QuickToolsHub?", a: "QuickToolsHub is a free online platform offering a collection of useful tools including PDF converters, image processors, and calculators. All tools run directly in your browser — no account needed." },
  { q: "How many files can I convert at once?", a: "Most tools support multiple file uploads. The Merge PDF tool accepts multiple PDFs, and the Image to PDF tool supports multiple images in one batch." },
  { q: "Are there any file size limits?", a: "Since processing happens locally in your browser, limits depend on your device's memory. Most standard files work smoothly." },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "All tools run directly in your browser — no waiting for server uploads or processing." },
  { icon: Lock, title: "100% Secure", desc: "Your files never leave your device. Zero data collection, zero privacy risk." },
  { icon: Globe, title: "No Registration", desc: "No account needed. Just open the tool and start working in seconds." },
  { icon: Shield, title: "Always Free", desc: "Every tool is completely free to use with no hidden fees or usage limits." },
];

const categories = [
  { icon: FileText, label: "PDF Tools", desc: "Convert, merge, and compress PDF files", count: 4, href: "/tools", color: "bg-red-50 text-red-600 border-red-100" },
  { icon: Image, label: "Image Tools", desc: "Compress, convert, and edit images", count: 4, href: "/tools", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { icon: Calculator, label: "Calculators", desc: "EMI, GST, age, and percentage calculators", count: 4, href: "/tools", color: "bg-green-50 text-green-600 border-green-100" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        data-testid={`faq-${q.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{a}</div>}
    </div>
  );
}

export default function Home() {
  const popularTools = tools.filter((t) => t.isPopular);

  return (
    <Layout>
      <Helmet>
        <title>QuickToolsHub — Free PDF, Image & Calculator Tools Online</title>
        <meta name="description" content="QuickToolsHub offers free online tools for PDF conversion, image compression, and calculations. No registration needed. 100% secure, browser-based tools." />
        <meta property="og:title" content="QuickToolsHub — Free PDF, Image & Calculator Tools Online" />
        <meta property="og:description" content="Free online tools for PDF, images, and calculations. Fast, secure, no registration." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quicktoolshub.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "QuickToolsHub",
          "url": "https://quicktoolshub.com",
          "description": "Free online tools for PDF, image, and calculator needs",
          "potentialAction": { "@type": "SearchAction", "target": "https://quicktoolshub.com/tools?q={search_term_string}", "query-input": "required name=search_term_string" }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnptLTEyIDZoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> 14+ Free Online Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Free Online Tools for<br />
            <span className="text-blue-200">PDF, Images & Calculators</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Convert, compress, and calculate — all in your browser. No registration, no file uploads, no fees. Just tools that work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              data-testid="hero-cta-primary"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Explore All Tools <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tools/image-to-pdf"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors"
            >
              Image to PDF
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-blue-200">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 100% Secure</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> No Account Needed</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Instant Processing</span>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="bg-gray-50 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <AdBanner size="leaderboard" className="hidden md:flex" />
        </div>
      </div>

      {/* Popular Tools */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Tools</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The tools people use most — fast, free, and ready to go</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tools" data-testid="view-all-tools" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              View all 14 tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Tool Categories</h2>
            <p className="text-gray-500">Everything organized, nothing buried</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                data-testid={`category-card-${cat.label.replace(/\s/g, "-").toLowerCase()}`}
                className={`border-2 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-all group ${cat.color}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{cat.label}</h3>
                <p className="text-sm text-gray-500 mb-2">{cat.desc}</p>
                <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full mt-2">{cat.count} tools</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose QuickToolsHub</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Built for speed, privacy, and simplicity — exactly what online tools should be</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 bg-gray-50">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Free Online Tools for Everyday Use</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <p>
                QuickTools Hub is a free online platform that provides powerful and easy-to-use tools for PDF editing, image conversion, and everyday calculations. Whether you need to merge PDF files, compress images, or calculate EMI and GST, our tools are designed to save your time and effort.
              </p>
              <p>
                All tools are fast, secure, and work directly in your browser. We prioritize your privacy — most tools process files locally, meaning your data is never uploaded to any server.
              </p>
              <p>
                QuickToolsHub is designed for individuals, students, freelancers, and businesses who need reliable digital tools available instantly — no account required, no software to install, no fees.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 text-base">What you can do with QuickToolsHub:</h3>
              <ul className="space-y-3">
                {[
                  "Merge, compress, and convert PDF files",
                  "Convert JPG to PNG and PNG to JPG",
                  "Free calculators for EMI, GST, percentage, and age",
                  "QR code and password generator tools",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="py-4 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AdBanner size="leaderboard" className="hidden md:flex" label="Sponsored" />
        </div>
      </div>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about QuickToolsHub</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
