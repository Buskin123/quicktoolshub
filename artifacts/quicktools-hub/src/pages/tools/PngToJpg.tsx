import { useState, useRef } from "react";
import { Download } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "png-to-jpg")!;

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
