import { useState } from "react";
import { Wand2, Sparkles, Mail } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "background-remover")!;

const toolInfo = {
  about: [
    "The AI Background Remover will automatically detect the subject of your image and remove the background in seconds, producing a clean PNG with a transparent background. No manual selection, no masking — just upload your image and let the AI do the work.",
    "Unlike manual editing in tools like Photoshop, AI-powered background removal uses machine learning models trained on millions of images to precisely separate subjects from their backgrounds. This produces professional-quality results for product photos, portrait shots, and graphic design assets.",
    "This feature is currently in development. We are building the processing model to run efficiently within the browser to maintain our core promise of complete privacy — your images will never be uploaded to any server.",
  ],
  whyUse: [
    "AI automatically detects and removes backgrounds — no manual work needed",
    "Will produce transparent PNG output compatible with all design tools",
    "Browser-based processing will keep your images completely private",
    "Free to use for everyone — no subscription or credits system",
    "Join the waitlist now and be first to access when it launches",
  ],
  features: [
    "AI-powered subject detection for accurate edge recognition",
    "Outputs transparent PNG files ready for design workflows",
    "Will support portraits, products, objects, and complex scenes",
    "Browser-based ML model for complete privacy",
    "Instant download of the background-removed image",
  ],
  benefits: [
    "Create professional product photos without a photo studio",
    "Prepare clean profile pictures for LinkedIn or business profiles",
    "Design stickers, icons, and graphics without manual masking",
    "Save hours of manual editing time in Photoshop or similar tools",
  ],
  useCases: [
    "E-commerce sellers removing backgrounds from product photos",
    "HR teams creating consistent employee headshots for directories",
    "Graphic designers isolating subjects for poster and banner designs",
    "Content creators preparing custom stickers and thumbnails",
    "Photographers delivering clean subject cutouts to clients",
  ],
  faqs: [
    { q: "When will the background remover be available?", a: "We are actively developing this feature. Join the waitlist with your email to receive early access as soon as it launches." },
    { q: "How does AI background removal work?", a: "AI models trained on segmentation tasks identify the foreground subject and background pixels in an image, then mask out the background to produce a transparent PNG output." },
    { q: "Will it work on complex backgrounds?", a: "Modern AI background removers handle most scenes including outdoor photos, studio shots, and cluttered backgrounds. Results are best when the subject is clearly distinct from the background." },
    { q: "Will this feature always be free?", a: "Yes. Like all tools on QuickToolsHub, the background remover will be completely free to use with no credits or subscription required." },
    { q: "What image formats will be supported?", a: "Once launched, the tool will support standard web image formats like JPG, JPEG, and PNG." },
    { q: "Do I need to manually draw an outline around the subject?", a: "No, the AI is completely automatic and requires zero manual masking or outlining from you." },
  ],
  tips: [
    "Subjects against simple, single-colour backgrounds will produce the cleanest results",
    "Good lighting separates the subject from the background — brighter and more even the better",
    "Portrait shots with clear facial edges produce very accurate AI cutouts",
    "Product photos on white backgrounds are ideal for e-commerce background removal",
    "After background removal, place the subject on a new background in a tool like Canva",
    "Join the waitlist early — early access users help shape the final feature",
  ],
};

export default function BackgroundRemover() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
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
