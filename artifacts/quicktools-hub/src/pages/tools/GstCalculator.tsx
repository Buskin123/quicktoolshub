import { useState } from "react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "gst-calculator")!;

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
