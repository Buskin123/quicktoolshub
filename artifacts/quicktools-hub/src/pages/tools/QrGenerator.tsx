import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "qr-generator")!;

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
