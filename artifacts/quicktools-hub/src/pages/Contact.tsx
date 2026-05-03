import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

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
        <meta name="description" content="Get in touch with the QuickToolsHub team. We're happy to help with questions, feedback, or partnership inquiries." />
        <link rel="canonical" href="https://quicktoolshub.com/contact" />
      </Helmet>

      <div className="bg-gradient-to-b from-blue-50 to-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500">Have a question, suggestion, or found a bug? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="flex gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Email</p>
              <p className="text-sm text-gray-500">hello@quicktoolshub.com</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Response Time</p>
              <p className="text-sm text-gray-500">Usually within 24 hours</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10 border-2 border-green-200 rounded-2xl bg-green-50">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h2>
            <p className="text-gray-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  data-testid="input-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  data-testid="input-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                data-testid="input-subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What is this about?"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                data-testid="input-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your question or feedback..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
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
