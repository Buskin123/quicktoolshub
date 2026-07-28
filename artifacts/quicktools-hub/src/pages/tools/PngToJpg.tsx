import { useState, useRef } from "react";
import { Download } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "png-to-jpg")!;

const toolInfo = {
  about: [
    "The PNG to JPG converter transforms your PNG images into JPEG format with an adjustable quality setting — all running directly in your browser. JPG files are significantly smaller than PNGs, making them ideal for photos, social media, and any situation where file size matters more than transparency.",
    "PNG files use lossless compression, which preserves every pixel perfectly but results in larger files. When you convert to JPG, any transparent areas in the PNG are replaced with a solid white background, and the image is re-encoded with lossy compression at the quality level you choose.",
    "This tool uses the browser's Canvas API for conversion. Your image is never uploaded to any server, making it a private, fast, and reliable solution for everyday image format conversion.",
  ],
  whyUse: [
    "Dramatically reduce image file size for faster sharing and uploading",
    "Control output quality with a precise slider to suit your needs",
    "No upload required — full privacy guaranteed",
    "JPG is universally supported across all platforms and devices",
    "Instant conversion with immediate preview and download",
  ],
  features: [
    "Adjustable quality slider from 1–100 for precise control",
    "Live before/after preview showing original and converted images",
    "Transparent PNG areas converted to clean white background",
    "Uses Canvas API for accurate, high-fidelity conversion",
    "Download converted JPG with a single click",
  ],
  benefits: [
    "Smaller file sizes load faster on websites and in email",
    "Meet social media platform upload size restrictions easily",
    "Reduce storage usage without discarding images permanently",
    "Improve compatibility with systems that don't support PNG",
  ],
  useCases: [
    "Photographers converting PNG exports to JPG for online galleries",
    "Developers optimizing images for faster website page loads",
    "Reducing PNG screenshot sizes before sharing in chats or emails",
    "Converting design exports to JPG for social media publishing",
    "Creating smaller versions of PNG images for archival storage",
  ],
  faqs: [
    { q: "Will I lose the transparent background when converting?", a: "Yes. JPG does not support transparency. Any transparent areas in your PNG will be filled with a solid white background in the output JPG." },
    { q: "What quality setting is recommended?", a: "A quality setting of 80–90% typically gives excellent visual results with a significant file size reduction. For web thumbnails, 60–75% is usually sufficient." },
    { q: "How much smaller will the JPG be compared to the PNG?", a: "JPG files are typically 3–10 times smaller than equivalent PNGs, depending on image content and the quality setting you choose." },
    { q: "Can I convert back from JPG to PNG later?", a: "Yes, using our JPG to PNG tool. However, the original transparency and any detail lost during JPG compression cannot be fully recovered." },
    { q: "Can I change the white background to another color?", a: "Currently, our tool defaults to a white background for transparent areas. If you need a specific color, add it in a design tool before converting." },
    { q: "Are my photos uploaded to a server?", a: "No. The entire conversion from PNG to JPG happens inside your browser using the HTML5 Canvas API." },
  ],
  tips: [
    "Use 85-90% quality for photos where the difference from 100% is invisible to the naked eye",
    "For web thumbnails and social media covers, 70-80% quality is sufficient",
    "Transparent areas in your PNG will become white in the JPG — plan accordingly",
    "After conversion, verify the image looks correct before discarding the original PNG",
    "JPG is best for photographs; use PNG to JPG mainly when file size is the priority",
    "Many social platforms prefer JPG for profile and cover photos — this is the right tool for that",
  ],
};

export default function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [quality, setQuality] = useState(90);
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
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const url = canvas.toDataURL("image/jpeg", quality / 100);
      setResult(url);
      setLoading(false);
    };
    img.src = preview;
  }

  function download() {
    if (!result || !file) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = file.name.replace(/\.png$/i, ".jpg");
    a.click();
  }

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Convert PNG images to JPG format online for free. Reduce file size with adjustable quality settings."
      howToSteps={["Upload your PNG image.", "Adjust quality if needed.", "Click 'Convert to JPG', then download."]}
    >
      <div
        data-testid="png-to-jpg-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0] || null); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        {file ? (
          <div>
            <p className="text-gray-800 font-semibold">{file.name}</p>
            <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 font-medium">Drag & drop a PNG image here</p>
            <p className="text-sm text-gray-400 mt-1">PNG files only — transparent areas become white</p>
          </>
        )}
        <button className="mt-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          {file ? "Change Image" : "Select PNG"}
        </button>
        <input ref={fileRef} type="file" accept="image/png" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
      </div>

      {file && (
        <>
          <div className="mb-4">
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>JPG Quality</span>
              <span className="text-primary font-bold">{quality}%</span>
            </label>
            <input data-testid="quality-slider" type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          {(preview || result) && (
            <div className="mb-4 rounded-xl border border-gray-200 overflow-hidden">
              <img src={result || preview!} alt="preview" className="w-full max-h-64 object-contain bg-white p-2" />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button data-testid="button-convert-png-jpg" onClick={convert} disabled={loading} className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {loading ? "Converting..." : "Convert to JPG"}
            </button>
            {result && (
              <button data-testid="button-download-jpg" onClick={download} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" /> Download JPG
              </button>
            )}
          </div>
        </>
      )}
    </ToolPageLayout>
  );
}
