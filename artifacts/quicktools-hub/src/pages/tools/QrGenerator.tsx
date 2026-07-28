import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "qr-generator")!;

const toolInfo = {
  about: [
    "The QR Code Generator creates scannable QR codes from any text, URL, phone number, or other string data. You can customise the foreground and background colours, adjust the output size, and download the result as a high-quality PNG image — all in your browser with no upload required.",
    "QR codes are a fast and contactless way to share information. A single scan from any smartphone camera instantly opens a URL, displays text, or triggers a phone call — making them invaluable for business cards, restaurant menus, event check-ins, product labels, and marketing materials.",
    "The generator uses the qrcode.react library to produce standards-compliant QR codes that are readable by all modern smartphone cameras and dedicated QR reader apps. The output PNG can be used in print, digital media, and presentations.",
  ],
  whyUse: [
    "Generate QR codes for any text, URL, or data instantly",
    "Customise colours to match your brand or design scheme",
    "Adjustable size from small to large for any print or digital use",
    "Download as PNG for immediate use in any project",
    "No account, no watermark, completely free",
  ],
  features: [
    "Supports any text input including URLs, plain text, and phone numbers",
    "Custom foreground (QR pattern) colour picker",
    "Custom background colour picker",
    "Adjustable output size (128px to 512px)",
    "One-click PNG download of the generated QR code",
  ],
  benefits: [
    "Share website links without users needing to type long URLs",
    "Enable contactless menu access for restaurants and cafes",
    "Add scannable links to printed marketing materials and posters",
    "Create branded QR codes that match your visual identity",
  ],
  useCases: [
    "Adding a QR code to a business card linking to your website or LinkedIn",
    "Generating a menu QR code for a restaurant or cafe table",
    "Creating event check-in codes for conferences or workshops",
    "Adding product information QR codes to packaging labels",
    "Sharing a WiFi password via QR code for guests",
  ],
  faqs: [
    { q: "What types of data can I encode in a QR code?", a: "You can encode any text string including website URLs, plain text messages, phone numbers (using 'tel:' prefix), email addresses, and more." },
    { q: "Can I customise the QR code colours?", a: "Yes. You can set both the foreground (dark pattern) colour and the background colour using the colour pickers. Ensure sufficient contrast for reliable scanning." },
    { q: "What format is the downloaded QR code?", a: "The QR code is downloaded as a PNG image file, which is compatible with all graphic design software, document editors, and print-ready workflows." },
    { q: "Do QR codes generated here expire?", a: "No. QR codes are just encoded data — they don't expire. As long as the URL or content they link to remains valid, the QR code will continue to work." },
    { q: "Why won't my smartphone scan the custom colored QR code?", a: "Most scanners require high contrast between the background (light) and the foreground (dark). Avoid using light foreground colors or dark backgrounds." },
    { q: "Can I add a logo to the center of the QR code?", a: "Currently, our tool generates pure, highly scannable QR codes without center logos to ensure maximum compatibility." },
    { q: "Is the QR code generated safely?", a: "Yes, the code is generated locally in your browser using JavaScript. We do not store or track the text you encode." },
  ],
  tips: [
    "Always test your QR code by scanning it before printing or distributing",
    "Use high-contrast colours (dark on light) for the best scan reliability",
    "For print materials, use at least 256px size; for large format printing, use 512px",
    "Add a short URL (use a URL shortener) instead of a long link for a less dense QR pattern",
    "For business cards, a 200-250px size printed at 300dpi gives excellent results",
    "Custom foreground colours work well — but avoid light colours on light backgrounds",
  ],
};

export default function QrGenerator() {
  const [text, setText] = useState("https://quicktoolshub.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#1d4ed8");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function download() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  }

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Free online QR code generator. Create and download custom QR codes for URLs, text, and more."
      howToSteps={["Enter the URL or text to encode.", "Customize size and colors.", "Click 'Download QR Code' to save as PNG."]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text or URL</label>
            <textarea
              data-testid="input-qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Size</span><span className="text-primary font-bold">{size}px</span>
            </label>
            <input
              data-testid="slider-qr-size"
              type="range"
              min={128}
              max={512}
              step={32}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foreground Color</label>
              <div className="flex gap-2">
                <input data-testid="input-fg-color" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200" />
                <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <div className="flex gap-2">
                <input data-testid="input-bg-color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200" />
                <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          {text ? (
            <>
              <div data-testid="qr-preview" className="p-4 bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
                <QRCodeCanvas
                  value={text}
                  size={Math.min(size, 280)}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="M"
                  includeMargin
                />
              </div>
              <button
                data-testid="button-download-qr"
                onClick={download}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" /> Download QR Code
              </button>
            </>
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
              <p className="text-sm text-gray-400 text-center px-4">Enter text to generate QR code</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
