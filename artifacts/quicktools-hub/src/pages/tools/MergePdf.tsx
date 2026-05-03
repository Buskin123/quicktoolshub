import { useState, useRef } from "react";
import { Upload, Download, X, Layers } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "merge-pdf")!;

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list).filter((f) => f.type === "application/pdf")]);
  }

  async function mergePdfs() {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const pdfBytes = await merged.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPageLayout
      tool={tool}
      seoDescription="Merge multiple PDF files into one document online for free. Drag and drop PDFs, reorder, and download the combined file instantly."
      howToSteps={[
        "Click 'Select PDF Files' or drag and drop multiple PDFs.",
        "Check the order — files will be merged in the listed order.",
        "Click 'Merge PDFs' to combine all files into one.",
        "Download the merged PDF to your device.",
      ]}
    >
      <div
        data-testid="merge-pdf-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        <Layers className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-600 font-medium">Drag & drop PDF files here</p>
        <p className="text-sm text-gray-400 mt-1">Add 2 or more PDFs to merge</p>
        <button className="mt-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Select PDF Files
        </button>
        <input ref={fileRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          <div className="space-y-2 mb-4">
            {files.map((file, i) => (
              <div key={i} data-testid={`pdf-file-${i}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  data-testid={`remove-pdf-${i}`}
                  onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                  className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {files.length < 2 && <p className="text-sm text-amber-600 mb-3">Add at least 2 PDFs to merge.</p>}
          <div className="flex justify-end gap-2">
            <button data-testid="button-clear-pdfs" onClick={() => setFiles([])} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Clear All</button>
            <button
              data-testid="button-merge-pdfs"
              onClick={mergePdfs}
              disabled={loading || files.length < 2}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Merging..." : <><Download className="w-4 h-4" /> Merge PDFs</>}
            </button>
          </div>
        </>
      )}
    </ToolPageLayout>
  );
}
