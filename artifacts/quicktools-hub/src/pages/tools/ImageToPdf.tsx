import { useState, useRef } from "react";
import { Upload, Download, X, FileImage } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "image-to-pdf")!;

const toolInfo = {
  about: [
    "The Image to PDF converter lets you combine one or more JPG or PNG images into a single, professional-quality PDF document — entirely within your browser. No software installation, no cloud upload, and no account required.",
    "This tool is ideal for anyone who needs to submit scanned documents, share photo collections, or turn visual content into a portable document format. Each image becomes its own page in the PDF, and the page dimensions automatically match the image size for a perfect fit.",
    "Since all processing happens locally using the PDF-Lib library, your files are never transmitted over the internet. This makes it a safe choice for sensitive documents like ID scans, medical reports, or confidential business materials.",
  ],
  whyUse: [
    "No software installation required — works in any modern browser",
    "Your images never leave your device — complete privacy guaranteed",
    "Combine multiple images into one organized PDF in seconds",
    "Supports both JPG and PNG formats seamlessly",
    "Completely free with no file size restrictions imposed by us",
  ],
  features: [
    "Drag-and-drop or click-to-upload interface for easy image selection",
    "Multi-image support — add as many images as your device can handle",
    "Automatic page sizing based on each image's original dimensions",
    "Numbered preview grid so you can verify the page order before converting",
    "One-click download of the finished PDF",
  ],
  benefits: [
    "Save time by bundling multiple images into a single shareable file",
    "Reduce email attachments from many files to just one clean PDF",
    "Create professional-looking documents from phone camera photos",
    "Avoid quality loss — images are embedded at their original resolution",
  ],
  useCases: [
    "Students scanning and submitting handwritten notes or assignments",
    "Freelancers creating PDF portfolios from design screenshots",
    "Combining multiple receipt photos into a single expense report",
    "Converting whiteboard photos from meetings into a shareable PDF",
    "Preparing scanned documents for online application portals",
  ],
  faqs: [
    { q: "Can I add multiple images to one PDF?", a: "Yes. You can add as many JPG or PNG images as you like. Each image becomes a separate page in the output PDF, in the order shown in the preview grid." },
    { q: "Does the tool preserve image quality?", a: "Yes. Images are embedded into the PDF at their original resolution without any quality reduction." },
    { q: "Is there a file size limit?", a: "We don't impose a server-side limit since all processing happens in your browser. Very large images may take longer depending on your device's memory." },
    { q: "Can I reorder the images before converting?", a: "The images appear in the order you add them. To reorder, clear all and re-add them in the desired sequence." },
  ],
};

export default function ImageToPdf() {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const newImgs = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImgs]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function convertToPdf() {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const { file } of images) {
        const bytes = await file.arrayBuffer();
        const img = file.type === "image/png"
          ? await pdfDoc.embedPng(bytes)
          : await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
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
      seoDescription="Convert JPG and PNG images to PDF online for free. No upload required — all processing happens in your browser instantly."
      howToSteps={[
        "Click 'Select Images' or drag and drop your JPG/PNG files.",
        "Reorder images if needed using the preview grid.",
        "Click 'Convert to PDF' to generate your PDF document.",
        "Download the PDF file to your device.",
      ]}
    >
      <div
        data-testid="image-to-pdf-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/50 transition-colors text-center mb-4"
      >
        <FileImage className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-600 font-medium">Drag & drop images here</p>
        <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG</p>
        <button className="mt-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Select Images
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4">
            {images.map((img, i) => (
              <div key={i} data-testid={`image-preview-${i}`} className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
                <img src={img.url} alt={img.file.name} className="w-full h-full object-cover" />
                <button
                  data-testid={`remove-image-${i}`}
                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-0.5 text-center truncate">{i + 1}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{images.length} image{images.length !== 1 ? "s" : ""} selected</p>
            <div className="flex gap-2">
              <button
                data-testid="button-clear-images"
                onClick={() => setImages([])}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                data-testid="button-convert-pdf"
                onClick={convertToPdf}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "Converting..." : <><Download className="w-4 h-4" /> Convert to PDF</>}
              </button>
            </div>
          </div>
        </>
      )}
    </ToolPageLayout>
  );
}
