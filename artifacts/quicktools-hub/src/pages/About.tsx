import { Helmet } from "react-helmet-async";
import { Shield, Zap, Globe, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | QuickToolsHub — Free Online Tools</title>
        <meta name="description" content="Learn about QuickToolsHub — a free platform offering browser-based PDF tools, image converters, and calculators with no registration required." />
        <link rel="canonical" href="https://quicktoolshub.com/about" />
      </Helmet>

      <div className="bg-gradient-to-b from-blue-50 to-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About QuickToolsHub</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            We believe everyone deserves access to fast, reliable online tools — without ads, paywalls, or privacy trade-offs.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray max-w-none mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            QuickToolsHub was created with one goal: to make everyday digital tasks simple, fast, and free. Converting a PDF, compressing an image, calculating an EMI — these are tasks people face daily. We built the tools we wished existed: browser-based, private, no-account, and instant.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Every tool on QuickToolsHub runs entirely in your browser using modern web APIs. That means no file uploads, no data retention, no server processing — just local computation on your device. Your files never leave your computer.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li><strong>PDF Tools:</strong> Image to PDF, Merge PDF, Compress PDF, PDF to Word</li>
            <li><strong>Image Tools:</strong> Image Compressor, JPG to PNG, PNG to JPG, Background Remover</li>
            <li><strong>Calculator Tools:</strong> Age Calculator, EMI Calculator, Percentage Calculator, GST Calculator</li>
            <li><strong>Extra Tools:</strong> QR Code Generator, Password Generator</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Zap, title: "Speed First", desc: "We optimize every tool for instant results — no loading spinners, no waiting." },
            { icon: Shield, title: "Privacy by Design", desc: "Zero file uploads. Your data never leaves your device. Ever." },
            { icon: Globe, title: "Always Accessible", desc: "No account required. Open any tool and get to work immediately." },
            { icon: Heart, title: "Always Free", desc: "Our core tools are free forever, supported by non-intrusive advertising." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 border border-gray-200 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
