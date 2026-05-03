import { useState } from "react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "emi-calculator")!;

function calcEmi(principal: number, rate: number, months: number) {
  const r = rate / 12 / 100;
  if (r === 0) return { emi: principal / months, total: principal, interest: 0 };
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = emi * months;
  const interest = total - principal;
  return { emi, total, interest };
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(60);

  const { emi, total, interest } = calcEmi(principal, rate, tenure);

  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const rows = Array.from({ length: Math.min(12, tenure) }, (_, i) => {
    const month = i + 1;
    const r = rate / 12 / 100;
    let bal = principal;
    for (let j = 0; j < i; j++) {
      const int = bal * r;
      bal = bal - (emi - int);
    }
    const interestPart = bal * r;
    const principalPart = emi - interestPart;
    return { month, principalPart, interestPart, balance: Math.max(0, bal - principalPart) };
  });

  return (
    <ToolPageLayout
      tool={tool}
      seoDescription="Calculate your monthly EMI for home, car, or personal loans. See total interest and amortization schedule instantly."
      howToSteps={["Enter the loan amount.", "Set the annual interest rate.", "Choose the loan tenure in months.", "View your monthly EMI and total interest."]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { label: "Loan Amount (₹)", value: principal, min: 10000, max: 10000000, step: 10000, setter: setPrincipal, display: fmt(principal) },
            { label: "Annual Interest Rate (%)", value: rate, min: 1, max: 30, step: 0.1, setter: setRate, display: `${rate}%` },
            { label: "Loan Tenure (Months)", value: tenure, min: 6, max: 360, step: 1, setter: setTenure, display: `${tenure} months` },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex justify-between text-sm mb-1">
                <label className="font-medium text-gray-700">{f.label}</label>
                <span className="text-primary font-bold">{f.display}</span>
              </div>
              <input
                data-testid={`slider-${f.label.replace(/\s/g, "-").toLowerCase()}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={f.value}
                onChange={(e) => f.setter(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{f.min}</span>
                <span>{f.max}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[
            { label: "Monthly EMI", value: fmt(emi), color: "bg-blue-600 text-white" },
            { label: "Total Amount Payable", value: fmt(total), color: "bg-gray-50 border border-gray-200 text-gray-800" },
            { label: "Total Interest Payable", value: fmt(interest), color: "bg-red-50 border border-red-100 text-red-700" },
            { label: "Principal Amount", value: fmt(principal), color: "bg-green-50 border border-green-100 text-green-700" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-4 ${item.color}`}>
              <p className={`text-xs ${item.color.includes("bg-blue") ? "text-blue-200" : "text-gray-500"} mb-1`}>{item.label}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Amortization Schedule (First 12 months)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">{["Month", "Principal", "Interest", "Balance"].map((h) => <th key={h} className="text-left p-2 text-xs font-semibold text-gray-500">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.month} className="border-t border-gray-100">
                  <td className="p-2 text-gray-600">{row.month}</td>
                  <td className="p-2 text-green-600 font-medium">{fmt(row.principalPart)}</td>
                  <td className="p-2 text-red-500">{fmt(row.interestPart)}</td>
                  <td className="p-2 text-gray-700">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolPageLayout>
  );
}
