import { useState, useRef } from "react";
import { Download, Image as ImageIcon } from "lucide-react";
import imageCompression from "browser-image-compression";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "image-compressor")!;

const toolInfo = {
  about: [
    "The Image Compressor tool reduces the file size of your JPG and PNG images using advanced browser-based compression algorithms. You can adjust the quality level from 1 to 100 to find the perfect balance between file size and visual fidelity — all without uploading your image to any server.",
    "Powered by the browser-image-compression library, the tool uses Web Workers to process your image in the background, keeping the page responsive even for large files. The result is a compressed image that maintains the same dimensions as the original while taking up significantly less storage space.",
    "This is particularly valuable for web developers optimizing images for faster page loads, bloggers reducing photo sizes before publishing, or anyone who needs to share images over messaging apps that have strict file size limits.",
  ],
  whyUse: [
    "Control compression quality with a precise slider from 1–100",
    "See exact before-and-after file sizes before downloading",
    "No upload needed — all compression runs in your browser",
    "Supports both JPG and PNG formats",
    "Uses Web Workers for smooth, non-blocking performance",
  ],
  features: [
    "Quality slider with real-time feedback on expected compression",
    "Side-by-side file size comparison after compression",
    "Drag-and-drop or click-to-upload image selection",
    "Original image preview displayed before compression",
    "Download compressed image with one click",
  ],
  benefits: [
    "Faster website loading times by reducing image payload sizes",
    "Smaller files that fit within messaging app upload limits",
    "Lower cloud storage costs when archiving large photo libraries",
    "Quicker email delivery with smaller image attachments",
  ],
  useCases: [
    "Web developers optimizing product or blog images before publishing",
    "Photographers reducing RAW exports for online portfolio sites",
    "Students compressing images before attaching to assignment submissions",
    "Social media managers preparing optimized images for faster uploads",
    "Reducing photo sizes for WhatsApp, Telegram, or email sharing",
  ],
  faqs: [
    { q: "What quality setting should I use?", a: "For most uses, 70–85% offers an excellent balance between visual quality and file size reduction. For web thumbnails, 50–70% is often sufficient." },
    { q: "Does compression change the image dimensions?", a: "No. The compressor reduces file size by adjusting quality encoding, not by resizing. Your image retains its original width and height." },
    { q: "Which image formats are supported?", a: "The tool supports JPG (JPEG) and PNG files. For other formats, consider converting to JPG first." },
    { q: "How much smaller will my image be?", a: "Results vary by image content and quality setting. Typical reductions range from 30% to 80% smaller than the original." },
    { q: "Can I undo the compression later?", a: "No, image compression is lossy (especially for JPGs). Always keep a backup of your original, uncompressed image." },
    { q: "Is the compression process secure?", a: "Yes. The entire compression process happens securely within your browser using Web Workers. No images are uploaded to any server." },
    { q: "Why did my PNG file get converted to a JPG?", a: "If your PNG does not have transparency and the quality setting requires lossy compression, some tools might convert it to a JPG format internally to save space." },
  ],
  tips: [
    "Start with 80% quality for most use cases — it's barely noticeable but significantly smaller",
    "For web use, aim for files under 200KB for fast page load times",
    "Use 70% quality for social media thumbnails where file size matters more",
    "Use 90%+ quality for professional portfolios where visual fidelity is paramount",
    "Compress images before uploading to CMS platforms like WordPress for better performance",
    "Always keep the original uncompressed image in a backup folder",
  ],
};

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<{ blob: Blob; url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setCompressed(null);
  }

  async function compress() {
    if (!file) return;
    setLoading(true);
    try {
      const opts = { maxSizeMB: 2, maxWidthOrHeight: 4096, useWebWorker: true, initialQuality: quality / 100 };
      const result = await imageCompression(file, opts);
      const url = URL.createObjectURL(result);
      setCompressed({ blob: result, url, size: result.size });
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!compressed || !file) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed_${file.name}`;
    a.click();
  }

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Compress images online for free without losing quality. Reduce JPG and PNG file sizes instantly in your browser."
      howToSteps={[
        "Upload your JPG or PNG image.",
        "Adjust the quality slider to your preference.",
        "Click 'Compress Image' and wait for processing.",
        "Download the compressed image.",
      ]}
    >
      <div
        data-testid="image-compressor-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0] || null); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
        {file ? (
          <div>
            <p className="text-gray-800 font-semibold">{file.name}</p>
            <p className="text-sm text-gray-400">Original: {(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 font-medium">Drag & drop an image here</p>
            <p className="text-sm text-gray-400 mt-1">JPG, PNG supported</p>
          </>
        )}
        <button className="mt-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          {file ? "Change Image" : "Select Image"}
        </button>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
      </div>

      {file && (
        <>
          <div className="mb-4">
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Quality</span>
              <span className="text-primary font-bold">{quality}%</span>
            </label>
            <input
              data-testid="quality-slider"
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Smaller file</span><span>Higher quality</span></div>
          </div>

          {compressed && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div><p className="text-gray-500">Original</p><p className="font-bold text-gray-800">{(file.size / 1024).toFixed(1)} KB</p></div>
                <div><p className="text-gray-500">Compressed</p><p className="font-bold text-green-700">{(compressed.size / 1024).toFixed(1)} KB ({Math.round((1 - compressed.size / file.size) * 100)}% smaller)</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <p className="text-xs text-center bg-gray-50 py-1 text-gray-500">Before</p>
                  {preview && <img src={preview} alt="original" className="w-full h-32 object-contain bg-white" />}
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <p className="text-xs text-center bg-green-50 py-1 text-green-600">After</p>
                  <img src={compressed.url} alt="compressed" className="w-full h-32 object-contain bg-white" />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button data-testid="button-compress-image" onClick={compress} disabled={loading} className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {loading ? "Compressing..." : "Compress Image"}
            </button>
            {compressed && (
              <button data-testid="button-download-compressed" onClick={download} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
            )}
          </div>
        </>
      )}
    </ToolPageLayout>
  );
}
