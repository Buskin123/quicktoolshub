import { useState } from "react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "emi-calculator")!;

const toolInfo = {
  about: [
    "The EMI Calculator helps you compute the Equated Monthly Instalment for any loan — whether it's a home loan, car loan, personal loan, or education loan. Enter the principal amount, annual interest rate, and loan tenure, and the calculator instantly shows your monthly EMI, total repayment amount, and total interest payable.",
    "EMI is calculated using the standard reducing-balance formula used by all banks and financial institutions in India. This ensures the results you see here match closely with the figures quoted by your lender, giving you a reliable basis for financial planning.",
    "The tool also generates a 12-month amortisation schedule showing how each monthly payment is split between principal repayment and interest, helping you understand how your loan balance reduces over time.",
  ],
  whyUse: [
    "Uses the industry-standard EMI formula for accurate results",
    "Shows total interest payable alongside monthly EMI",
    "12-month amortisation table for detailed payment breakdown",
    "Adjust inputs instantly to compare different loan scenarios",
    "No data stored — all calculations happen in your browser",
  ],
  features: [
    "Inputs for loan amount, annual interest rate, and tenure in months",
    "Real-time EMI, total amount, and total interest display",
    "Month-by-month amortisation schedule for the first 12 months",
    "Indian Rupee (INR) formatting for clear readability",
    "Instant recalculation on every input change",
  ],
  benefits: [
    "Plan monthly budgets by knowing your exact loan commitment",
    "Compare different loan amounts and tenures before applying",
    "Understand how much of each EMI goes to interest vs principal",
    "Make informed decisions about prepayment and loan duration",
  ],
  useCases: [
    "Planning a home loan and comparing 15-year vs 20-year tenures",
    "Checking affordability of a car loan before visiting a dealership",
    "Students evaluating education loan repayment obligations",
    "Comparing personal loan offers from different banks",
    "Financial planning for self-employed individuals with irregular income",
  ],
  faqs: [
    { q: "What is EMI?", a: "EMI stands for Equated Monthly Instalment — the fixed amount you pay to your lender each month until the loan is fully repaid, covering both principal and interest." },
    { q: "Is the EMI formula the same as banks use?", a: "Yes. The tool uses the standard reducing-balance EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is principal, r is monthly interest rate, and n is tenure in months." },
    { q: "Can I use this for home loans, car loans, and personal loans?", a: "Yes. The calculator works for any loan type. Simply enter the correct principal, interest rate, and tenure for your specific loan." },
    { q: "Does the calculator account for processing fees or prepayment?", a: "No. The calculator computes pure EMI based on principal, rate, and tenure. Processing fees, GST on EMI, or prepayment charges are not included." },
    { q: "Why is the interest portion higher in the first few months?", a: "This is how reducing-balance loans work. Interest is charged on the outstanding principal, which is highest at the beginning of the loan." },
    { q: "Can I print or save the amortization schedule?", a: "You can easily take a screenshot or use your browser's print function to save the detailed monthly breakdown." },
  ],
  tips: [
    "Compare EMIs at different tenures (e.g., 5 vs 10 years) to find your sweet spot between affordability and total interest",
    "A shorter tenure means higher EMI but less total interest paid",
    "Even a 0.5% interest rate difference can significantly change your total repayment over long tenures",
    "Use the amortisation table to see how much principal you repay in the first year",
    "Consider the impact of EMI on your monthly cash flow — it should ideally stay under 40% of income",
    "Processing fees and insurance are not included — factor those into your total borrowing cost",
  ],
};

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
      toolInfo={toolInfo}
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
