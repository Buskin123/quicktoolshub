import { useState } from "react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "percentage-calculator")!;

const toolInfo = {
  about: [
    "The Percentage Calculator provides three distinct calculation modes to handle the most common percentage problems you encounter in daily life. Whether you need to find X% of a number, determine what percentage one number is of another, or calculate the percentage change between two values, this tool has you covered.",
    "Each mode is designed for a specific real-world scenario. The 'X% of Y' mode is perfect for calculating discounts or tips. The 'what percentage' mode helps you work out exam scores or sales ratios. The 'percentage change' mode is essential for analysing growth rates, price changes, or performance improvements.",
    "All calculations happen instantly in your browser as you type. Results are shown clearly with a description of what was calculated, making it easy to verify the output makes sense.",
  ],
  whyUse: [
    "Three calculation modes cover virtually all percentage scenarios",
    "Instant results as you type — no submit button needed",
    "Results include a description so you can verify correctness",
    "Supports decimal inputs for precise calculations",
    "Free, private, and works offline once the page loads",
  ],
  features: [
    "Mode 1: Calculate X% of Y (e.g., 15% of 2,500)",
    "Mode 2: Find what percentage X is of Y (e.g., marks out of total)",
    "Mode 3: Calculate percentage increase or decrease from X to Y",
    "Supports decimal values in all input fields",
    "Descriptive result label confirming what was calculated",
  ],
  benefits: [
    "Quickly calculate discounts while shopping without mental maths",
    "Verify exam scores and grade percentages effortlessly",
    "Track business KPIs with accurate percentage change calculations",
    "Calculate tips, service charges, and split bills accurately",
  ],
  useCases: [
    "Calculating a 20% discount on a product's original price",
    "Finding what percentage of exam marks a student scored",
    "Measuring monthly revenue growth as a percentage change",
    "Computing GST or service tax amounts from base prices",
    "Calculating profit margin percentage for sales reporting",
  ],
  faqs: [
    { q: "What are the three calculation modes?", a: "Mode 1 finds X% of Y. Mode 2 finds what percentage X is of Y. Mode 3 calculates the percentage increase or decrease from X to Y." },
    { q: "Can I use decimal numbers?", a: "Yes. All three modes accept decimal inputs for precise calculations. For example, you can calculate 12.5% of 3,750." },
    { q: "How accurate are the results?", a: "Results are accurate to 4 decimal places, with trailing zeros removed for cleaner display. Percentage change is shown to 2 decimal places." },
    { q: "Can I use this for business calculations?", a: "Yes. The calculator is suitable for business use including margin calculations, growth rate analysis, discount computing, and tax estimation." },
    { q: "What does a negative percentage change mean?", a: "A negative result in Mode 3 simply means the new value is smaller than the original value, representing a percentage decrease." },
    { q: "Does the calculator round off the results?", a: "Yes, it rounds results appropriately for standard usage (e.g., 2 decimal places for percentage change), ensuring they are practical for real-world scenarios." },
  ],
  tips: [
    "Use Mode 1 (X% of Y) for calculating discounts, tips, or tax amounts",
    "Use Mode 2 (X is what % of Y) to convert exam marks into percentage scores",
    "Use Mode 3 (% Change) to calculate month-over-month or year-over-year growth rates",
    "Negative percentage change indicates a decrease — useful for tracking cost reductions",
    "For compound growth calculations, use Mode 3 repeatedly across multiple periods",
    "Double-check your inputs by reversing the calculation to verify the result",
  ],
};

export default function PercentageCalculator() {
  const [mode, setMode] = useState(0);
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  function calcResult(): string {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) return "";
    if (mode === 0) return `${((na / 100) * nb).toFixed(4).replace(/\.?0+$/, "")} (${na}% of ${nb})`;
    if (mode === 1) return `${((na / nb) * 100).toFixed(4).replace(/\.?0+$/, "")}% (${na} is what % of ${nb})`;
    if (mode === 2) return `${(((nb - na) / na) * 100).toFixed(2)}% ${nb >= na ? "increase" : "decrease"} (from ${na} to ${nb})`;
    return "";
  }

  const result = calcResult();

  const modes = [
    { label: "X% of Y", desc: "What is X% of Y?", aLabel: "Percentage (X)", bLabel: "Number (Y)" },
    { label: "X is what % of Y", desc: "X is what percent of Y?", aLabel: "Value (X)", bLabel: "Total (Y)" },
    { label: "% Change", desc: "Percentage increase or decrease", aLabel: "Original Value", bLabel: "New Value" },
  ];

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Free percentage calculator — find X% of Y, what percent X is of Y, and percentage change between values."
      howToSteps={["Select the calculation mode.", "Enter the required values.", "See the result instantly."]}
    >
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          {modes.map((m, i) => (
            <button
              key={i}
              data-testid={`mode-btn-${i}`}
              onClick={() => { setMode(i); setA(""); setB(""); }}
              className={`flex-1 text-xs font-medium py-2 px-1 rounded-lg transition-all ${mode === i ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4 text-center">{modes[mode].desc}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{modes[mode].aLabel}</label>
            <input
              data-testid="input-a"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{modes[mode].bLabel}</label>
            <input
              data-testid="input-b"
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {result && (
          <div data-testid="percentage-result" className="mt-6 p-5 bg-blue-50 border-2 border-primary/20 rounded-2xl text-center">
            <p className="text-xs text-gray-500 mb-1">Result</p>
            <p className="text-2xl font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
