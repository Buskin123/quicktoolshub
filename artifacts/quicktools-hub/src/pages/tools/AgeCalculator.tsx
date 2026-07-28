import { useState } from "react";
import { Calculator } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "age-calculator")!;

const toolInfo = {
  about: [
    "The Age Calculator computes your exact age in years, months, and days from your date of birth. It also shows your total age in days and tells you how many days remain until your next birthday — making it far more informative than a simple year-count.",
    "The calculation accounts for leap years, varying month lengths, and the current date automatically, so you always get a precise result without any manual arithmetic. The tool updates instantly as you change the date of birth input.",
    "All calculations happen entirely on your device using JavaScript. No data is stored, transmitted, or logged — your date of birth is used only to produce the result and is never saved.",
  ],
  whyUse: [
    "Precise age in years, months, and days — not just years",
    "Shows total age in days and days until next birthday",
    "Automatically accounts for leap years and varying month lengths",
    "No data stored or transmitted — complete privacy",
    "Instant results with no waiting or page reload",
  ],
  features: [
    "Exact age breakdown: years, months, and days",
    "Total age in days for precise duration calculations",
    "Next birthday countdown showing days remaining",
    "Next birthday date displayed for planning",
    "Instant calculation on date selection",
  ],
  benefits: [
    "Verify age quickly for legal documents, insurance, or applications",
    "Plan birthday celebrations with the exact days-remaining countdown",
    "Calculate precise ages for medical and health records",
    "Useful for HR and payroll teams verifying employee age eligibility",
  ],
  useCases: [
    "Calculating age for government ID or passport applications",
    "Parents tracking their child's exact age for school admissions",
    "Health professionals calculating patient ages for medical assessments",
    "Individuals checking retirement eligibility based on exact age",
    "Trivia and curiosity — finding out your exact age in days",
  ],
  faqs: [
    { q: "How accurate is the age calculation?", a: "The calculation is precise to the day, correctly accounting for leap years and the differing number of days in each month." },
    { q: "Can I calculate age for a future date of birth?", a: "No. The calculator requires a date of birth in the past. Future dates are not accepted since age cannot be negative." },
    { q: "Is my date of birth saved anywhere?", a: "No. Your date of birth is used only to calculate the result in your browser and is never stored, transmitted, or logged." },
    { q: "Why does the total days count look so large?", a: "A 30-year-old has lived approximately 10,950 days. Total days is an accurate measure of your full lifespan expressed in the smallest time unit shown." },
    { q: "How are leap years handled?", a: "The calculator checks the calendar properties of each year and month between your birth date and today, adding leap days automatically where applicable." },
    { q: "Does the calculator use my local time zone?", a: "Yes, it uses your device's current date and time settings to ensure the age calculation is perfectly synchronized with your actual today." },
  ],
  tips: [
    "Use your exact birth date for the most precise result, not an estimate",
    "The calculator updates instantly — no need to click a button after entering your date",
    "Use the 'total days lived' figure for trivia, milestone celebrations, or birthday posts",
    "Check the next birthday countdown to plan surprise parties or gift orders in advance",
    "For children's school admissions, use the exact age in years and months as required",
    "The calculator accounts for leap years automatically — no manual adjustment needed",
  ],
};

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
}

function calcAge(dob: string): AgeResult | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  if (birth > today) return null;

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const nextBirthdayDate = nextBirthday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return { years, months, days, totalDays, nextBirthdayDays, nextBirthdayDate };
}

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const result = calcAge(dob);

  const today = new Date().toISOString().split("T")[0];

  return (
    <ToolPageLayout
      tool={tool}
      toolInfo={toolInfo}
      seoDescription="Calculate your exact age in years, months, and days. Find out how many days until your next birthday."
      howToSteps={["Enter your date of birth.", "Your exact age is calculated instantly.", "See your next birthday countdown."]}
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            data-testid="input-dob"
            type="date"
            value={dob}
            max={today}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {result && (
          <div className="space-y-3" data-testid="age-result">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Years", value: result.years, color: "bg-blue-50 border-blue-100 text-blue-700" },
                { label: "Months", value: result.months, color: "bg-green-50 border-green-100 text-green-700" },
                { label: "Days", value: result.days, color: "bg-purple-50 border-purple-100 text-purple-700" },
              ].map((item) => (
                <div key={item.label} className={`border rounded-xl p-4 text-center ${item.color}`}>
                  <p className="text-3xl font-bold">{item.value}</p>
                  <p className="text-sm font-medium mt-1 opacity-80">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Total days lived</p>
                <p className="text-xl font-bold text-gray-800">{result.totalDays.toLocaleString()}</p>
              </div>
              <div className="border border-amber-100 rounded-xl p-4 bg-amber-50">
                <p className="text-xs text-amber-600 mb-1">Next birthday in</p>
                <p className="text-xl font-bold text-amber-700">{result.nextBirthdayDays} days</p>
                <p className="text-xs text-amber-500 mt-0.5">{result.nextBirthdayDate}</p>
              </div>
            </div>
          </div>
        )}

        {dob && !result && (
          <p className="text-red-500 text-sm text-center">Please enter a valid past date.</p>
        )}
      </div>
    </ToolPageLayout>
  );
}
