import { useState, useRef } from "react";
import { Download, Image as ImageIcon } from "lucide-react";
import imageCompression from "browser-image-compression";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "image-compressor")!;

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
