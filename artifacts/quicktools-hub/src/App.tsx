import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import Disclaimer from "@/pages/Disclaimer";
import PdfTools from "@/pages/PdfTools";
import ImageTools from "@/pages/ImageTools";
import Calculators from "@/pages/Calculators";
import Generators from "@/pages/Generators";
import ImageToPdf from "@/pages/tools/ImageToPdf";
import MergePdf from "@/pages/tools/MergePdf";
import CompressPdf from "@/pages/tools/CompressPdf";
import PdfToWord from "@/pages/tools/PdfToWord";
import ImageCompressor from "@/pages/tools/ImageCompressor";
import JpgToPng from "@/pages/tools/JpgToPng";
import PngToJpg from "@/pages/tools/PngToJpg";
import BackgroundRemover from "@/pages/tools/BackgroundRemover";
import AgeCalculator from "@/pages/tools/AgeCalculator";
import EmiCalculator from "@/pages/tools/EmiCalculator";
import PercentageCalculator from "@/pages/tools/PercentageCalculator";
import GstCalculator from "@/pages/tools/GstCalculator";
import QrGenerator from "@/pages/tools/QrGenerator";
import PasswordGenerator from "@/pages/tools/PasswordGenerator";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools" component={Tools} />
      <Route path="/pdf-tools" component={PdfTools} />
      <Route path="/image-tools" component={ImageTools} />
      <Route path="/calculators" component={Calculators} />
      <Route path="/generators" component={Generators} />
      <Route path="/tools/image-to-pdf" component={ImageToPdf} />
      <Route path="/tools/merge-pdf" component={MergePdf} />
      <Route path="/tools/compress-pdf" component={CompressPdf} />
      <Route path="/tools/pdf-to-word" component={PdfToWord} />
      <Route path="/tools/image-compressor" component={ImageCompressor} />
      <Route path="/tools/jpg-to-png" component={JpgToPng} />
      <Route path="/tools/png-to-jpg" component={PngToJpg} />
      <Route path="/tools/background-remover" component={BackgroundRemover} />
      <Route path="/tools/age-calculator" component={AgeCalculator} />
      <Route path="/tools/emi-calculator" component={EmiCalculator} />
      <Route path="/tools/percentage-calculator" component={PercentageCalculator} />
      <Route path="/tools/gst-calculator" component={GstCalculator} />
      <Route path="/tools/qr-generator" component={QrGenerator} />
      <Route path="/tools/password-generator" component={PasswordGenerator} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
