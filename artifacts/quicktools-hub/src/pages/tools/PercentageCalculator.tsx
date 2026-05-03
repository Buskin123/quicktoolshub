import { useState } from "react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "percentage-calculator")!;

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
