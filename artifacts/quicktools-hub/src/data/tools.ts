import React from 'react';
import { FileImage, FileText, Image as ImageIcon, Calculator, Scissors, Percent, FileDown, Layers, Replace, PercentDiamond, Lock, QrCode, SplitSquareHorizontal, FileBox, Wand2, Hash } from 'lucide-react';

export type ToolCategory = 'PDF Tools' | 'Image Tools' | 'Calculators' | 'Other Tools';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  category: ToolCategory;
  color: string;
  isPopular?: boolean;
}

export const tools: Tool[] = [
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert JPG, PNG images to PDF documents in seconds.',
    icon: FileImage,
    path: '/tools/image-to-pdf',
    category: 'PDF Tools',
    color: 'bg-red-100 text-red-600',
    isPopular: true
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDFs into a single document.',
    icon: Layers,
    path: '/tools/merge-pdf',
    category: 'PDF Tools',
    color: 'bg-orange-100 text-orange-600',
    isPopular: true
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality.',
    icon: FileDown,
    path: '/tools/compress-pdf',
    category: 'PDF Tools',
    color: 'bg-green-100 text-green-600',
    isPopular: true
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Extract text from PDF documents easily.',
    icon: FileText,
    path: '/tools/pdf-to-word',
    category: 'PDF Tools',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress JPG, PNG images without losing quality.',
    icon: ImageIcon,
    path: '/tools/image-compressor',
    category: 'Image Tools',
    color: 'bg-indigo-100 text-indigo-600',
    isPopular: true
  },
  {
    id: 'jpg-to-png',
    title: 'JPG to PNG',
    description: 'Convert JPG images to transparent PNG format.',
    icon: Replace,
    path: '/tools/jpg-to-png',
    category: 'Image Tools',
    color: 'bg-violet-100 text-violet-600'
  },
  {
    id: 'png-to-jpg',
    title: 'PNG to JPG',
    description: 'Convert PNG images to JPG format.',
    icon: FileBox,
    path: '/tools/png-to-jpg',
    category: 'Image Tools',
    color: 'bg-fuchsia-100 text-fuchsia-600'
  },
  {
    id: 'background-remover',
    title: 'Background Remover',
    description: 'Remove backgrounds from images instantly.',
    icon: Wand2,
    path: '/tools/background-remover',
    category: 'Image Tools',
    color: 'bg-purple-100 text-purple-600',
    isPopular: true
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    icon: Calculator,
    path: '/tools/age-calculator',
    category: 'Calculators',
    color: 'bg-cyan-100 text-cyan-600',
    isPopular: true
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate your monthly EMI and total interest.',
    icon: Hash,
    path: '/tools/emi-calculator',
    category: 'Calculators',
    color: 'bg-teal-100 text-teal-600'
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases.',
    icon: Percent,
    path: '/tools/percentage-calculator',
    category: 'Calculators',
    color: 'bg-sky-100 text-sky-600'
  },
  {
    id: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Add or remove GST from your prices easily.',
    icon: PercentDiamond,
    path: '/tools/gst-calculator',
    category: 'Calculators',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Create and download custom QR codes.',
    icon: QrCode,
    path: '/tools/qr-generator',
    category: 'Other Tools',
    color: 'bg-slate-100 text-slate-600',
    isPopular: true
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate strong, secure passwords instantly.',
    icon: Lock,
    path: '/tools/password-generator',
    category: 'Other Tools',
    color: 'bg-gray-100 text-gray-600'
  }
];

export const getToolsByCategory = () => {
  const grouped = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, Tool[]>);
  
  return Object.entries(grouped).map(([category, items]) => ({
    category: category as ToolCategory,
    tools: items
  }));
};
