import { useState, useCallback } from "react";
import { Copy, RefreshCw, Check, Lock } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "password-generator")!;

function generatePassword(length: number, upper: boolean, lower: boolean, numbers: boolean, symbols: boolean): string {
  const charSets = [
    upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    lower ? "abcdefghijklmnopqrstuvwxyz" : "",
    numbers ? "0123456789" : "",
    symbols ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "",
  ].filter(Boolean);
  if (charSets.length === 0) return "";
  const all = charSets.join("");
  return Array.from({ length }, () => all[Math.floor(Math.random() * all.length)]).join("");
}

function strength(pw: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "w-1/5" };
  if (score === 2) return { label: "Fair", color: "bg-orange-400", width: "w-2/5" };
  if (score === 3) return { label: "Good", color: "bg-yellow-400", width: "w-3/5" };
  if (score === 4) return { label: "Strong", color: "bg-blue-500", width: "w-4/5" };
  return { label: "Very Strong", color: "bg-green-500", width: "w-full" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState(() => generatePassword(16, true, true, true, false));
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setPassword(generatePassword(length, upper, lower, numbers, symbols));
  }, [length, upper, lower, numbers, symbols]);

  function copy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const str = strength(password);

  const options = [
    { label: "Uppercase (A-Z)", value: upper, setter: setUpper },
    { label: "Lowercase (a-z)", value: lower, setter: setLower },
    { label: "Numbers (0-9)", value: numbers, setter: setNumbers },
    { label: "Symbols (!@#$)", value: symbols, setter: setSymbols },
  ];

  return (
    <ToolPageLayout
      tool={tool}
      seoDescription="Free online password generator. Create strong, secure passwords with custom length and character options instantly."
      howToSteps={["Set your desired password length.", "Choose character types to include.", "Click 'Generate' to create a new password.", "Copy it to your clipboard."]}
    >
      <div className="max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="flex items-center gap-2 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
            <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <code data-testid="password-output" className="flex-1 font-mono text-lg text-gray-800 break-all">{password}</code>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              data-testid="button-copy-password"
              onClick={copy}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${copied ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
            <button
              data-testid="button-generate-password"
              onClick={generate}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Generate
            </button>
          </div>
        </div>

        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Password Length</span>
          <span className="text-primary font-bold">{length}</span>
        </div>
        <input
          data-testid="slider-password-length"
          type="range"
          min={6}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-primary mb-4"
        />

        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-1">Strength: <span className={`font-bold ${str.label === "Weak" ? "text-red-500" : str.label === "Fair" ? "text-orange-400" : str.label === "Good" ? "text-yellow-500" : str.label === "Strong" ? "text-blue-500" : "text-green-500"}`}>{str.label}</span></p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${str.color} ${str.width} transition-all rounded-full`} />
          </div>
        </div>

        <div className="space-y-3">
          {options.map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 cursor-pointer group">
              <div
                data-testid={`toggle-${opt.label.replace(/\s|\(|\)/g, "-").toLowerCase()}`}
                onClick={() => { opt.setter(!opt.value); }}
                className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${opt.value ? "bg-primary" : "bg-gray-200"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${opt.value ? "left-5" : "left-1"}`} />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
