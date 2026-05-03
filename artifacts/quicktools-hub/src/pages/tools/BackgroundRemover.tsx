import { useState } from "react";
import { Wand2, Sparkles, Mail } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "background-remover")!;

export default function BackgroundRemover() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <ToolPageLayout
      tool={tool}
      seoDescription="Remove image backgrounds online. AI-powered background removal coming soon — join the waitlist for early access."
    >
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <Wand2 className="w-10 h-10 text-purple-600" />
        </div>
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" /> AI-Powered — Coming Soon
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">AI Background Removal</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          Our AI-powered background remover is currently in development. It will automatically detect and remove backgrounds from any image in seconds — powered by advanced machine learning models running securely in your browser.
        </p>

        <div className="max-w-sm mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Join the waitlist for early access</p>
          {submitted ? (
            <div className="text-center py-2">
              <p className="text-green-600 font-medium">You're on the list!</p>
              <p className="text-sm text-gray-500 mt-1">We'll notify you when it's ready.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex gap-2">
              <input
                data-testid="input-waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
              />
              <button
                data-testid="button-join-waitlist"
                type="submit"
                className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Mail className="w-4 h-4" /> Join
              </button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
          {[
            { title: "Instant removal", desc: "Remove backgrounds in under 2 seconds with AI" },
            { title: "High accuracy", desc: "Works on portraits, products, and complex images" },
            { title: "Privacy first", desc: "Processing happens locally — no file uploads" },
          ].map((f) => (
            <div key={f.title} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-semibold text-gray-800 text-sm mb-1">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
