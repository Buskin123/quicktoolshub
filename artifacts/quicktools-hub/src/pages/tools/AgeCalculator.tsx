import { useState } from "react";
import { Calculator } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "age-calculator")!;

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
