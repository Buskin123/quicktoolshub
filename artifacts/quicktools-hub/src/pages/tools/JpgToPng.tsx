import { useState, useRef } from "react";
import { Download, Replace } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "jpg-to-png")!;

const toolInfo = {
  about: [
    "The JPG to PNG converter transforms your JPEG images into the PNG format entirely within your browser. PNG is a lossless format that supports transparent backgrounds, making it the preferred choice for logos, icons, web graphics, and design assets.",
    "Unlike JPG, which uses lossy compression that subtly degrades quality with each save, PNG files retain every pixel of data exactly as captured. This makes PNG ideal when you need crisp edges, sharp text, or plan to further edit the image without quality loss.",
    "The conversion uses the browser's built-in Canvas API to redraw the image and export it as a PNG file. No data leaves your device, and the resulting file is downloaded directly to your computer.",
  ],
  whyUse: [
    "Convert to PNG to gain support for transparent backgrounds",
    "PNG is a lossless format — no quality degradation on re-saving",
    "Ideal for preparing images for design tools like Figma or Canva",
    "Completely browser-based with no file upload to any server",
    "Fast conversion with instant preview and one-click download",
  ],
  features: [
    "Instant conversion using the browser's native Canvas API",
    "Before-and-after preview showing both the original and converted image",
    "Outputs a standard PNG file compatible with all applications",
    "Drag-and-drop or click-to-select upload interface",
    "One-click download of the converted PNG",
  ],
  benefits: [
    "Enable transparent backgrounds for logos and icons",
    "Preserve image quality for multi-step editing workflows",
    "Ensure compatibility with design software that requires PNG input",
    "Prepare images for web use where lossless quality is needed",
  ],
  useCases: [
    "Designers converting product photos to PNG for background removal",
    "Developers preparing icons and sprites in PNG format for web apps",
    "Bloggers converting JPG screenshots to PNG for sharper text",
    "Students converting image formats for design or presentation software",
    "Creating PNG versions of logos for use on different coloured backgrounds",
  ],
  faqs: [
    { q: "Will converting JPG to PNG improve the image quality?", a: "No. Converting to PNG prevents further quality loss, but it cannot recover detail that was already lost during JPG compression. The result will look identical to the original JPG." },
    { q: "Does PNG support transparent backgrounds?", a: "Yes, PNG natively supports transparency. However, since your JPG has no transparency data, the converted PNG will have a solid white background by default." },
    { q: "Will the PNG file be larger than the JPG?", a: "Yes. PNG files are generally larger than JPGs because PNG uses lossless compression. This is the trade-off for better quality and transparency support." },
    { q: "Can I convert multiple images at once?", a: "Currently the tool converts one image at a time. Simply run it again for each additional image you need to convert." },
  ],
};

export default function JpgToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  }

  function convert() {
    if (!file || !preview) return;
    setLoading(true);
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const url = canvas.toDataURL("image/png");
      setResult(url);
      setLoading(false);
    };
    img.src = preview;
  }

  function download() {
    if (!result || !file) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = file.name.replace(/\.(jpg|jpeg)$/i, ".png");
    a.click();
  }

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Convert JPG images to PNG format online for free. Preserve transparency and quality with instant browser-based conversion."
      howToSteps={["Upload your JPG or JPEG image.", "Click 'Convert to PNG' to process.", "Download the converted PNG file."]}
    >
      <div
        data-testid="jpg-to-png-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0] || null); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        <Replace className="w-12 h-12 text-gray-300 mb-3" />
        {file ? (
          <div>
            <p className="text-gray-800 font-semibold">{file.name}</p>
            <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 font-medium">Drag & drop a JPG image here</p>
            <p className="text-sm text-gray-400 mt-1">JPG and JPEG files supported</p>
          </>
        )}
        <button className="mt-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          {file ? "Change Image" : "Select JPG"}
        </button>
        <input ref={fileRef} type="file" accept="image/jpeg" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
      </div>

      {preview && (
        <div className="mb-4 rounded-xl border border-gray-200 overflow-hidden">
          <p className="text-xs text-center bg-gray-50 py-1 text-gray-500">Preview</p>
          <img src={result || preview} alt="preview" className="w-full max-h-64 object-contain bg-white p-2" />
        </div>
      )}

      {file && (
        <div className="flex justify-end gap-2">
          <button data-testid="button-convert-jpg-png" onClick={convert} disabled={loading} className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {loading ? "Converting..." : "Convert to PNG"}
          </button>
          {result && (
            <button data-testid="button-download-png" onClick={download} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" /> Download PNG
            </button>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
