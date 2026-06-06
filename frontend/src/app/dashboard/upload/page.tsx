import { CheckCircle2, FileText, Loader2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/Button";

const steps = [
  { label: "Uploading to secure storage...", status: "done" },
  { label: "Sending to AI for analysis...", status: "loading" },
  { label: "Extracting invoice fields...", status: "pending" },
  { label: "Running validation...", status: "pending" }
] as const;

const UploadPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Upload invoice</h1>
        <p className="text-sm text-ink-600">Drag and drop files to start extraction.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-dashed border-mist-200 bg-white p-10 shadow-card">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink-700">Drop invoice here or click to upload</div>
              <div className="text-xs text-ink-500">JPG, PNG, PDF — Max 10MB</div>
            </div>
            <Button>Select file</Button>
          </div>
        </div>
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist-100">
              <FileText className="h-5 w-5 text-ink-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink-700">INV-2024-1043.pdf</div>
              <div className="text-xs text-ink-500">2.6 MB</div>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            {steps.map((step) => (
              <div key={step.label} className="flex items-center gap-3 rounded-lg border border-mist-200 bg-mist-100 px-3 py-2">
                {step.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : step.status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-mist-200" />
                )}
                <span className={step.status === "pending" ? "text-ink-500" : "text-ink-700"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
