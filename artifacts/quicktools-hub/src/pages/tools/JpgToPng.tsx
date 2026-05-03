import { useState, useRef } from "react";
import { Download, Replace } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "jpg-to-png")!;

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
