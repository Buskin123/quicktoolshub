import { useState } from "react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "gst-calculator")!;

const toolInfo = {
  about: [
    "The GST Calculator is designed for the Indian Goods and Services Tax system. It lets you quickly add GST to a base price or remove GST from an inclusive price, supporting all four standard GST slabs: 5%, 12%, 18%, and 28%.",
    "Whether you are a business owner creating invoices, a freelancer calculating service charges, or a consumer verifying the GST component of a purchase, this tool gives you instant, accurate breakdowns of GST amount, price before GST, and price after GST.",
    "The calculator uses the correct GST formulas — adding GST multiplies the base by (1 + rate/100), while removing GST from an inclusive price divides the tax portion by (100 + rate). All results are formatted in Indian Rupees (INR) for immediate use in billing and accounting.",
  ],
  whyUse: [
    "Supports all four GST slabs: 5%, 12%, 18%, and 28%",
    "Both 'add GST' and 'remove GST' modes in one tool",
    "Results formatted in INR for direct use in Indian invoices",
    "Instant calculation — no submit button, updates as you type",
    "Free, private, and no internet connection needed after page load",
  ],
  features: [
    "Toggle between Add GST and Remove GST modes",
    "Supports 5%, 12%, 18%, and 28% GST rate slabs",
    "Displays GST amount, pre-GST price, and post-GST price",
    "Indian Rupee (INR) number formatting throughout",
    "Instant recalculation on every input or rate change",
  ],
  benefits: [
    "Create accurate GST-inclusive invoices in seconds",
    "Verify GST components on supplier bills and purchase invoices",
    "Avoid manual calculation errors in tax-sensitive documents",
    "Useful for both registered businesses and unregistered small traders",
  ],
  useCases: [
    "Freelancers calculating 18% GST on professional service invoices",
    "Retailers adding 12% or 28% GST to product sale prices",
    "Consumers checking how much GST is included in a bill amount",
    "Accountants reconciling GST payable and GST paid in returns",
    "E-commerce sellers computing inclusive prices for product listings",
  ],
  faqs: [
    { q: "What GST rates does this calculator support?", a: "The calculator supports India's four standard GST slabs: 5%, 12%, 18%, and 28%, covering most goods and services." },
    { q: "How do I add GST to a price?", a: "Select 'Add GST', enter the base price before tax, choose your GST rate, and the tool shows the GST amount and final price including GST." },
    { q: "How do I find the pre-GST price from an inclusive amount?", a: "Select 'Remove GST', enter the total amount including GST, choose the rate, and the tool will calculate and display the original pre-GST price and the GST portion." },
    { q: "Is this calculator specific to India?", a: "Yes. It uses Indian GST slabs and formats results in INR. The logic applies specifically to India's GST system introduced in July 2017." },
    { q: "Does this separate CGST and SGST?", a: "Currently, it shows the total GST amount. For intra-state transactions, this total is split equally (50/50) into CGST and SGST." },
    { q: "Why is the remove GST formula different from a simple percentage deduction?", a: "Because GST is added to a base price. To reverse it from an inclusive price, you must divide the total by (1 + rate/100) instead of simply subtracting the percentage." },
  ],
  tips: [
    "Use 'Add GST' mode when creating invoices from a base price",
    "Use 'Remove GST' mode when you have received a GST-inclusive bill and need to separate the tax",
    "18% is the most common GST rate for services in India — it applies to most professional services",
    "For restaurants, 5% GST applies to most standard dining (no ITC); verify your specific category",
    "Always cross-verify GST amounts against your GST registration documents",
    "For composite scheme dealers, consult a chartered accountant as different rates apply",
  ],
};

const GST_RATES = [5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const num = parseFloat(amount) || 0;

  const gstAmount = mode === "add" ? (num * rate) / 100 : (num * rate) / (100 + rate);
  const totalWithGst = mode === "add" ? num + gstAmount : num;
  const priceWithoutGst = mode === "add" ? num : num - gstAmount;

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Free GST calculator — add or remove GST from prices. Supports 5%, 12%, 18%, and 28% GST rates."
      howToSteps={["Enter the amount.", "Select whether to add or remove GST.", "Choose the GST rate.", "See the breakdown instantly."]}
    >
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          {[{ label: "Add GST", value: "add" as const }, { label: "Remove GST", value: "remove" as const }].map((m) => (
            <button
              key={m.value}
              data-testid={`gst-mode-${m.value}`}
              onClick={() => setMode(m.value)}
              className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${mode === m.value ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {mode === "add" ? "Price (excluding GST)" : "Price (including GST)"}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
            <input
              data-testid="input-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate</label>
          <div className="grid grid-cols-4 gap-2">
            {GST_RATES.map((r) => (
              <button
                key={r}
                data-testid={`gst-rate-${r}`}
                onClick={() => setRate(r)}
                className={`py-2 rounded-xl text-sm font-bold border-2 transition-all ${rate === r ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"}`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        {num > 0 && (
          <div data-testid="gst-result" className="space-y-3">
            {[
              { label: mode === "add" ? "Price (excl. GST)" : "Price (excl. GST)", value: fmt(priceWithoutGst), color: "bg-gray-50 border-gray-200 text-gray-800" },
              { label: `GST Amount (${rate}%)`, value: fmt(gstAmount), color: "bg-orange-50 border-orange-100 text-orange-700" },
              { label: "Total (incl. GST)", value: fmt(totalWithGst), color: "bg-blue-600 border-blue-600 text-white" },
            ].map((item) => (
              <div key={item.label} className={`flex items-center justify-between p-4 rounded-xl border ${item.color}`}>
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-lg font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
