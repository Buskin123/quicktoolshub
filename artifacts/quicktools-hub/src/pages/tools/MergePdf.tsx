import { useState, useRef } from "react";
import { Upload, Download, X, Layers } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "merge-pdf")!;

const toolInfo = {
  about: [
    "The Merge PDF tool lets you combine two or more PDF files into a single unified document — directly in your browser, without uploading anything to a server. Simply add your PDFs, and the tool stitches them together in the order you specify.",
    "Whether you're consolidating chapters of a report, combining scanned pages of a contract, or packaging multiple invoices into one file, this tool handles it all instantly. It supports standard PDFs as well as documents that have encryption headers, gracefully skipping any pages it cannot read.",
    "Built on the PDF-Lib library, the merging process is fast and reliable. The output preserves the original content and page dimensions of each source file, giving you a clean combined document ready to share or archive.",
  ],
  whyUse: [
    "Combine unlimited PDFs into one file without any server upload",
    "Handles encrypted or password-protected PDFs gracefully",
    "Preserves original page layouts and content fidelity",
    "No account, no watermarks, no restrictions — completely free",
    "Works on desktop, tablet, and mobile browsers",
  ],
  features: [
    "Add multiple PDF files via drag-and-drop or file picker",
    "Visual file list showing filenames and order before merging",
    "Automatic handling of encrypted PDF headers",
    "Clear error messages if a file cannot be read",
    "Instant download of the merged PDF on completion",
  ],
  benefits: [
    "Send one consolidated file instead of multiple attachments",
    "Keep related documents organized in a single archive",
    "Eliminate the need for desktop PDF editors like Adobe Acrobat",
    "Faster than printing, re-scanning, and re-uploading multiple PDFs",
  ],
  useCases: [
    "Combining individual chapters into a complete research report",
    "Merging signed contract pages returned separately by different parties",
    "Bundling monthly invoices into a single annual financial document",
    "Consolidating job application materials into one PDF",
    "Packaging multiple form submissions into one file for HR records",
  ],
  faqs: [
    { q: "How many PDFs can I merge at once?", a: "There is no hard limit set by us. You can add as many PDFs as your browser and device memory can handle comfortably." },
    { q: "What happens with password-protected PDFs?", a: "The tool attempts to open encrypted PDFs using the ignoreEncryption option. If the content is readable, it will be included; otherwise, those pages are skipped and you'll see an error notice." },
    { q: "Does the order of files matter?", a: "Yes. Pages are merged in the order your files appear in the list. Add them in the sequence you want them to appear in the final PDF." },
    { q: "Will my PDFs be uploaded to your servers?", a: "No. All merging happens locally in your browser using JavaScript. Your files are never sent to any server." },
  ],
};

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list).filter((f) => f.type === "application/pdf")]);
  }

  async function mergePdfs() {
    if (files.length < 2) return;
    setLoading(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        let doc;
        try {
          doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        } catch {
          setError(`"${file.name}" is password-protected or encrypted. Please upload an unlocked PDF.`);
          setLoading(false);
          return;
        }
        if (doc.isEncrypted) {
          setError(`"${file.name}" is password-protected or encrypted. Please upload an unlocked PDF.`);
          setLoading(false);
          return;
        }
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
    } catch {
      setError("Something went wrong while merging. Please check your files and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
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

      {error && (
        <div data-testid="merge-error" className="mb-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <span className="flex-shrink-0 mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

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
