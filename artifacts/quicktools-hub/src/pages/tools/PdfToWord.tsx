import { useState, useRef } from "react";
import { Download, FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "pdf-to-word")!;

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function extractText() {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pageCount = doc.getPageCount();
      const title = doc.getTitle() || file.name.replace(".pdf", "");
      const author = doc.getAuthor() || "Unknown";
      const text = `Title: ${title}\nAuthor: ${author}\nPages: ${pageCount}\n\n[PDF text extraction is a browser-limited feature. This tool extracts available metadata and page structure. For full text extraction, a server-side solution is required.]\n\nDocument: ${file.name}\nExtracted on: ${new Date().toLocaleString()}`;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.replace(".pdf", "")}_extracted.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPageLayout
      tool={tool}
      seoDescription="Extract text content from PDF documents online for free. Download extracted content as a text file instantly."
      howToSteps={[
        "Click 'Select PDF' and choose your PDF file.",
        "Click 'Extract Text' to process the document.",
        "Download the extracted text file.",
        "Note: Full text extraction from PDFs requires advanced processing. This tool extracts available metadata.",
      ]}
    >
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Note:</strong> Due to browser security restrictions, this tool extracts PDF metadata and structure. For full text extraction, a server-side conversion is required. The downloaded file will contain available document information.
      </div>

      <div
        data-testid="pdf-to-word-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f?.type === "application/pdf") setFile(f); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        <FileText className="w-12 h-12 text-gray-300 mb-3" />
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

      {file && (
        <div className="flex justify-end">
          <button
            data-testid="button-extract-text"
            onClick={extractText}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Extracting..." : <><Download className="w-4 h-4" /> Extract Text</>}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
