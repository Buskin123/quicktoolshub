import { Helmet } from "react-helmet-async";
import { Shield, Zap, Globe, Heart, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const values = [
  { icon: Zap, title: "Speed First", desc: "We optimize every tool for instant results — no loading spinners, no waiting for uploads." },
  { icon: Shield, title: "Privacy by Design", desc: "Zero file uploads. Your data never leaves your device. Processing happens entirely in your browser." },
  { icon: Globe, title: "Always Accessible", desc: "No account required. Open any tool and get to work immediately from any device." },
  { icon: Heart, title: "Always Free", desc: "Our core tools are free forever, supported by non-intrusive advertising." },
];

const offerings = [
  { category: "PDF Tools", items: ["Image to PDF", "Merge PDF", "Compress PDF", "PDF to Word"] },
  { category: "Image Tools", items: ["Image Compressor", "JPG to PNG", "PNG to JPG", "Background Remover"] },
  { category: "Calculators", items: ["EMI Calculator", "GST Calculator", "Age Calculator", "Percentage Calculator"] },
  { category: "Generators", items: ["QR Code Generator", "Password Generator"] },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | QuickToolsHub — Free Online Tools</title>
        <meta name="description" content="QuickToolsHub is a modern platform offering free tools for PDF editing, image conversion, and everyday calculations. No registration, no file uploads, 100% private." />
        <link rel="canonical" href="https://quicktoolshub.com/about" />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-50 dark:from-blue-900/20 to-white dark:to-gray-950 py-14 px-4 transition-colors">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About QuickToolsHub</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            A modern platform offering free tools for PDF editing, image conversion, and everyday calculations — built for everyone, requiring nothing.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Main description */}
        <div className="mb-12 space-y-5 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          <p>
            <strong className="text-gray-800 dark:text-gray-200">QuickTools Hub</strong> is a modern platform offering free tools for PDF editing, image conversion, and everyday calculations. Our mission is to provide simple, fast, and secure tools that anyone can use without technical knowledge.
          </p>
          <p>
            Most tools work directly in your browser, ensuring privacy and safety. No files are ever sent to our servers — your documents, images, and data stay entirely on your device at all times. This means you get instant results without waiting for uploads or worrying about data privacy.
          </p>
          <p>
            We built QuickToolsHub because we believe essential digital tools should be accessible to everyone — students, freelancers, small businesses, and professionals — without paywalls, software installs, or forced sign-ups.
          </p>
        </div>

        {/* What We Offer — grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offerings.map((group) => (
              <div key={group.category} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 transition-colors">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm uppercase tracking-wide">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6 text-center transition-colors">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Trusted by Users Worldwide</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            QuickToolsHub is used daily by students, designers, accountants, and professionals who need reliable, fast tools without the clutter. Every tool is tested for accuracy and browser compatibility.
          </p>
        </div>
      </div>
    </Layout>
  );
}
