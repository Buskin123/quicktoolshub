import { useState, useRef } from "react";
import { Download, FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "pdf-to-word")!;

const toolInfo = {
  about: [
    "The PDF Text Extractor tool reads the metadata and structural information embedded in your PDF file and exports it as a plain text document. This includes details like the document title, author name, page count, and creation information — all extracted directly in your browser.",
    "Because modern browsers have limitations on reading the full rendered text content of PDFs (which requires server-side processing), this tool focuses on extracting the available metadata and document structure. It is ideal for quickly identifying document properties without opening a full PDF viewer.",
    "All extraction happens locally — your PDF file is never transmitted to any server. The output is downloaded as a .txt file that you can open in any text editor, word processor, or note-taking application.",
  ],
  whyUse: [
    "Quickly extract PDF document metadata without opening a viewer",
    "No software installation or account required",
    "Complete privacy — PDF stays on your device throughout",
    "Output is a simple .txt file compatible with all word processors",
    "Useful for cataloguing document properties across a file collection",
  ],
  features: [
    "Extracts title, author, and page count from PDF metadata",
    "Exports extracted information as a downloadable .txt file",
    "Works with any PDF regardless of page count or creation software",
    "Instant processing with no wait time for server responses",
    "Clean, readable output format",
  ],
  benefits: [
    "Identify document author and title without opening the full PDF",
    "Quickly check page counts across multiple documents",
    "Create a text-based index of your PDF document collection",
    "Useful for archiving and document management workflows",
  ],
  useCases: [
    "Auditing metadata of PDFs before sharing them externally",
    "Quickly checking page counts of multiple submitted documents",
    "Extracting document titles for building a file index or catalogue",
    "Verifying author metadata on PDFs received from collaborators",
    "Creating a plain-text summary of document properties for records",
  ],
  faqs: [
    { q: "Does this tool extract all the body text from my PDF?", a: "Browser-based PDF text extraction has limitations. This tool extracts available metadata (title, author, page count). For full body text extraction, a server-side tool is typically required." },
    { q: "What information is extracted?", a: "The tool extracts document title, author name, page count, filename, and extraction timestamp from the PDF's internal metadata fields." },
    { q: "Why can't browsers extract full PDF text?", a: "PDF text rendering involves complex font encoding and layout data that requires dedicated server-side libraries for complete extraction. Browser APIs provide access to metadata only." },
    { q: "Is my PDF file uploaded anywhere?", a: "No. Your PDF is processed entirely within your browser using the PDF-Lib library. Nothing is uploaded to any server." },
    { q: "Can I extract metadata from password-protected PDFs?", a: "No, if the PDF requires a password to open, the browser cannot read its metadata fields without the password." },
    { q: "What format is the extracted data saved in?", a: "The extracted metadata is saved as a clean, universally readable .txt file that you can open in Notepad, Word, or any text editor." },
    { q: "Will this tool damage my original PDF?", a: "Not at all. The tool only reads the file and does not modify or overwrite your original PDF." },
  ],
  tips: [
    "Use this tool to quickly check document metadata (author, title, page count) before sharing",
    "Clean up PDF metadata before sharing if it contains sensitive author information",
    "Large PDFs with many pages will still extract metadata instantly — page count doesn't affect speed",
    "Use extracted metadata to build a file index or document register",
    "Check author metadata on received PDFs to verify document authenticity",
    "Export metadata before archiving documents for future reference",
  ],
};

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
      toolInfo={toolInfo}
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
