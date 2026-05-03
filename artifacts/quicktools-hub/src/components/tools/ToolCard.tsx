import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact";
}

export function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const Icon = tool.icon;

  if (variant === "compact") {
    return (
      <Link
        href={tool.path}
        data-testid={`tool-card-compact-${tool.id}`}
        className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-md transition-all group"
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">{tool.title}</p>
          <p className="text-xs text-gray-500 truncate">{tool.description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
      </Link>
    );
  }

  return (
    <Link
      href={tool.path}
      data-testid={`tool-card-${tool.id}`}
      className="flex flex-col p-5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-lg transition-all group cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${tool.color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors mb-1">{tool.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{tool.description}</p>
      <div className="flex items-center gap-1 mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Use tool <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}
