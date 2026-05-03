import { useState, useRef } from "react";
import { Download, FileDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "compress-pdf")!;

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ originalSize: number; newSize: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function compress() {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const compressed = await doc.save({ useObjectStreams: true });
      const blob = new Blob([compressed], { type: "application/pdf" });
      setResult({ originalSize: file.size, newSize: blob.size });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPageLayout
      tool={tool}
      seoDescription="Compress PDF file size online for free. Reduce PDF size for email or upload while keeping content intact."
      howToSteps={[
        "Click 'Select PDF' and choose your PDF file.",
        "Click 'Compress PDF' to optimize the file.",
        "Download the compressed PDF to your device.",
      ]}
    >
      <div
        data-testid="compress-pdf-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f?.type === "application/pdf") setFile(f); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        <FileDown className="w-12 h-12 text-gray-300 mb-3" />
        {file ? (
          <div>
            <p className="text-gray-800 font-semibold">{file.name}</p>
            <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 font-medium">Drag & drop a PDF here</p>
            <p className="text-sm text-gray-400 mt-1">PDF files only</p>
          </>
        )}
        <button className="mt-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          {file ? "Change PDF" : "Select PDF"}
        </button>
        <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>

      {result && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="font-semibold text-green-800 mb-2">Compression complete</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-gray-500">Original size</p><p className="font-bold text-gray-800">{(result.originalSize / 1024).toFixed(1)} KB</p></div>
            <div><p className="text-gray-500">Compressed size</p><p className="font-bold text-green-700">{(result.newSize / 1024).toFixed(1)} KB</p></div>
          </div>
        </div>
      )}

      {file && (
        <div className="flex justify-end">
          <button
            data-testid="button-compress-pdf"
            onClick={compress}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Compressing..." : <><Download className="w-4 h-4" /> Compress PDF</>}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
