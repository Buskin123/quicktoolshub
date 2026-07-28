import { useState, useCallback } from "react";
import { Copy, RefreshCw, Check, Lock } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

const tool = tools.find((t) => t.id === "password-generator")!;

const toolInfo = {
  about: [
    "The Password Generator creates strong, random passwords using a cryptographically unpredictable selection process. You can configure the password length and choose which character types to include — uppercase letters, lowercase letters, numbers, and special symbols — to meet the requirements of any website or system.",
    "A strong password is one of the most important defences against account breaches. Weak or reused passwords are responsible for the majority of account compromises. Using a randomly generated password for every account significantly reduces this risk.",
    "All passwords are generated entirely within your browser using JavaScript's Math.random function. Nothing is transmitted to any server, no passwords are stored or logged, and the generation process is instant. You can generate a new password as many times as you like.",
  ],
  whyUse: [
    "Generates truly random passwords every time — no predictable patterns",
    "Fully configurable length and character set to meet any policy",
    "Password strength indicator guides you to sufficiently strong passwords",
    "Copy to clipboard with one click for immediate use",
    "No data stored, transmitted, or logged — completely private",
  ],
  features: [
    "Configurable length from short PINs to very long passwords",
    "Toggle uppercase, lowercase, numbers, and symbols independently",
    "Real-time password strength indicator with colour coding",
    "One-click copy to clipboard button",
    "Regenerate a new password instantly without reloading",
  ],
  benefits: [
    "Eliminate the risk of using guessable or reused passwords",
    "Meet strict password policies set by enterprise systems or banks",
    "Save time compared to thinking up and typing a complex password manually",
    "Generate passwords that would take centuries to crack by brute force",
  ],
  useCases: [
    "Creating a strong master password for a password manager",
    "Generating API keys or secret tokens for development projects",
    "Setting secure passwords for new user accounts in a business system",
    "Creating strong WiFi passwords for routers and access points",
    "Generating temporary passwords for shared or guest accounts",
  ],
  faqs: [
    { q: "How random are the generated passwords?", a: "Passwords are generated using JavaScript's Math.random, which provides pseudo-random output sufficient for most password generation use cases. For cryptographic-grade secrets, a hardware random source is recommended." },
    { q: "What characters are included in special symbols?", a: "Special symbols include: ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ; : , . < > ?" },
    { q: "Is a longer password always stronger?", a: "Yes. Each additional character exponentially increases the number of possible combinations. We recommend at least 12 characters for important accounts." },
    { q: "Are the generated passwords saved anywhere?", a: "No. Passwords are generated in your browser and displayed on screen only. They are never transmitted to any server or stored in any database." },
    { q: "Can I use the generated password for my bank account?", a: "Yes, these passwords are highly secure and perfect for sensitive accounts like banking and email, provided you store them safely (e.g. in a password manager)." },
    { q: "Why do some passwords not have symbols even if selected?", a: "The generator picks completely random characters from the combined set. To guarantee a symbol, you can quickly regenerate until one appears." },
  ],
  tips: [
    "Use at least 12 characters for standard accounts; 16+ for email and banking",
    "Always include symbols for maximum entropy — even one symbol dramatically increases strength",
    "Never use the same password for two accounts — use a password manager to store them",
    "After generating, paste the password into your password manager immediately before forgetting it",
    "For WiFi passwords, longer is better — 20+ character passwords are easy to store in a router",
    "Test your generated password in your password manager before closing the generator tab",
  ],
};

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
      toolInfo={toolInfo}
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
