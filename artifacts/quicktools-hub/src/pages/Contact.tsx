import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MessageSquare, Send, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | QuickToolsHub</title>
        <meta name="description" content="Get in touch with the QuickToolsHub team via Telegram. We're happy to help with questions, feedback, or support inquiries." />
        <link rel="canonical" href="https://quicktoolshub.com/contact" />
      </Helmet>

      <div className="bg-gradient-to-b from-blue-50 dark:from-blue-900/20 to-white dark:to-gray-950 py-14 px-4 transition-colors">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            For support, questions, or feedback, feel free to reach out through our official Telegram channel. We aim to respond as quickly as possible.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Contact cards — Telegram + Response Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* Telegram */}
          <a
            href="https://t.me/quicktoolshub"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-telegram"
            className="flex gap-3 p-5 border border-blue-200 dark:border-blue-700 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#29a8e0] flex items-center justify-center flex-shrink-0 text-white group-hover:bg-[#1a96ce] transition-colors">
              <TelegramIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-1">
                Telegram <ExternalLink className="w-3 h-3 opacity-50" />
              </p>
              <p className="text-sm text-[#29a8e0] dark:text-blue-400 group-hover:underline">@quicktoolshub</p>
              <p className="text-xs text-gray-400 mt-0.5">Preferred contact method</p>
            </div>
          </a>

          {/* Response Time */}
          <div className="flex gap-3 p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Response Time</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Usually within 24 hours</p>
              <p className="text-xs text-gray-400 mt-0.5">Mon – Sat</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10 border-2 border-green-200 dark:border-green-700 rounded-2xl bg-green-50 dark:bg-green-900/20 transition-colors">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Message Sent!</h2>
            <p className="text-gray-500 dark:text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  data-testid="input-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  data-testid="input-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <input
                data-testid="input-subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What is this about?"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                data-testid="input-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your question or feedback..."
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              />
            </div>
            <button
              data-testid="button-submit-contact"
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
