import { useState, useRef } from "react";
import { Download, FileDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "compress-pdf")!;

const toolInfo = {
  about: [
    "The Compress PDF tool reduces the file size of your PDF documents so they're easier to email, upload to portals, or store on your device. The compression runs entirely in your browser using the PDF-Lib library, so your files are never sent to any external server.",
    "Compression works by re-encoding the internal PDF object streams into a more compact format. While the reduction varies depending on the original file's content and how it was created, most PDFs see a meaningful decrease in size — especially those with redundant metadata or unoptimized object structures.",
    "This tool is particularly useful when you need to meet file size limits on job application portals, government submission forms, or email attachments. You can see the before-and-after file size comparison on screen before downloading.",
  ],
  whyUse: [
    "Instantly reduce PDF size without any cloud upload or registration",
    "See exact before-and-after file sizes in the result",
    "Privacy-first — all compression happens on your device",
    "Free with no usage caps or watermarks added",
    "Works on any modern browser including mobile",
  ],
  features: [
    "Single-click compression with automatic optimization",
    "Real-time size comparison showing original vs compressed size",
    "Uses object stream compression for maximum space savings",
    "Supports any PDF regardless of how it was created",
    "Instant download of the compressed file",
  ],
  benefits: [
    "Meet email attachment limits without manually splitting files",
    "Upload to government and job portals that cap file sizes",
    "Save storage space on devices and cloud drives",
    "Share documents faster over slow internet connections",
  ],
  useCases: [
    "Compressing resumes and cover letters for online job applications",
    "Reducing document size before uploading to government e-portals",
    "Shrinking invoices and reports before emailing clients",
    "Optimizing PDF ebooks and manuals for mobile reading",
    "Preparing compressed documents for WhatsApp or messaging app sharing",
  ],
  faqs: [
    { q: "How much will my PDF shrink?", a: "Results vary by file. PDFs with lots of embedded images or unoptimized structure tend to compress more. Text-heavy, already-optimized PDFs may see smaller reductions." },
    { q: "Will compression affect the visual quality of my PDF?", a: "This tool uses lossless structural compression — it does not re-compress embedded images, so visual quality is preserved." },
    { q: "Can I compress multiple PDFs at once?", a: "Currently the tool processes one PDF at a time. Simply run it again for each file you need to compress." },
    { q: "Why is my compressed file the same size as the original?", a: "If your PDF was already well-optimized, there may be little room for further reduction. This is normal for PDFs exported from modern applications." },
  ],
};

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
      toolInfo={toolInfo}
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
