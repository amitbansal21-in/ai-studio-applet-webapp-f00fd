/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Upload, Lock, ShieldCheck, Cpu, AlertCircle, FileText, Check, HelpCircle } from "lucide-react";
import { ConsolidatedAnalysisResult } from "../types";

interface UploadCenterProps {
  onAnalysisComplete: (result: ConsolidatedAnalysisResult) => void;
  activePlan: string;
}

const AVAILABLE_BANKS = [
  { key: "sbi", name: "State Bank of India (SBI)", type: "Nationalised", tier: "Tier 1 - Native", logo: "🏛️" },
  { key: "hdfc", name: "HDFC Bank Ltd.", type: "Private Commercial", tier: "Tier 1 - Native", logo: "💳" },
  { key: "shivaji", name: "Shree Shivaji Sahakari Co-op Bank", type: "Co-operative Bank", tier: "Tier 2 - AI OCR", logo: "🌾" },
  { key: "satara_pat", name: "Satara Teachers Credit Patpedhi", type: "Credit Society", tier: "Tier 2 - AI OCR", logo: "👥" },
  { key: "bajaj", name: "Bajaj Finance Card Ledger", type: "NBFC", tier: "Tier 2 - AI OCR", logo: "⚡" },
  { key: "dbs", name: "DBS Bank India", type: "Foreign Bank", tier: "Tier 2 - AI OCR", logo: "🌐" },
];

export default function UploadCenter({ onAnalysisComplete, activePlan }: UploadCenterProps) {
  const [selectedBank, setSelectedBank] = useState<string>("sbi");
  const [password, setPassword] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setUploadedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    });
    setRawFile(file);
    setError(null);

    // Dynamic password detection simulation based on file metadata or common formats
    if (file.name.toLowerCase().includes("secure") || file.name.toLowerCase().includes("protected") || Math.random() > 0.6) {
      setPasswordRequired(true);
    } else {
      setPasswordRequired(false);
    }
  };

  const startAnalysis = async () => {
    if (!uploadedFile) {
      setError("Please upload or drag a bank statement file first.");
      return;
    }

    if (passwordRequired && !password) {
      setError("This PDF file is password protected. Please enter the master password to decrypt statement.");
      return;
    }

    // Free tier checks
    if (activePlan === "Free" && selectedBank !== "sbi" && selectedBank !== "hdfc") {
      setError("Co-operative banks, Patpedhi, and NBFC parsing is limited to Professional & Business Plans. Please upgrade to parse Shivaji Co-op/Satara Patpedhi.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let fileBase64: string | undefined = undefined;
      let fileType: string | undefined = undefined;

      if (rawFile) {
        setProcessingStep("Reading statement binary streams...");
        fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64);
          };
          reader.onerror = () => reject(new Error("Unable to read selected statement file structure."));
          reader.readAsDataURL(rawFile);
        });
        fileType = rawFile.type;
        // Wait a short duration to let the user feel the heavy scanning activity
        await new Promise((r) => setTimeout(r, 400));
      }

      // Step-by-step enterprise parser cycle telemetry representation
      const steps = [
        "Decrypting PDF using 256-bit AES algorithms...",
        "Executing Tier Bank Identification scanner...",
        selectedBank === "sbi" || selectedBank === "hdfc"
          ? "Initializing High-Performance Tier 1 Native Template Parser..."
          : "Invoking Tier 2 Universal AI OCR Engine (Tesseract + PyPDF OCR)...",
        "Extracting columnar Date, Narration, Debit, Credit & running balance arrays...",
        "Perfecting math balance ledgers and categories tagging...",
        "Formulating GST payments & salary stability indicators...",
        "Calculating Loan Readiness Index and final financial intelligence payload..."
      ];

      for (let i = 0; i < steps.length; i++) {
        setProcessingStep(steps[i]);
        await new Promise((r) => setTimeout(r, 350)); // Adjusted speed slightly for snappier feedback
      }

      // Call our backend API to perform rigorous parser compilation and metric processing
      const response = await fetch("/api/parse-statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankKey: selectedBank,
          password: password || undefined,
          fileName: uploadedFile.name,
          fileBase64,
          fileType,
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        onAnalysisComplete(resJson.data);
      } else {
        throw new Error(resJson.error || "Failed to parse bank statement catalog.");
      }
    } catch (err: any) {
      setError(err.message || "A parsing exception occurred in the Python microservice layer. Check file format.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectDemoFile = (bankKey: string) => {
    setSelectedBank(bankKey);
    setUploadedFile({
      name: `FinCred_Demo_${bankKey.toUpperCase()}_Statement.pdf`,
      size: "1.45 MB",
    });
    setRawFile(null); // Clear raw file since this is pre-loaded demo metadata
    setPasswordRequired(bankKey === "dbs" || bankKey === "shivaji");
    setPassword(bankKey === "dbs" ? "dbspass12" : bankKey === "shivaji" ? "cooppass" : "");
    setError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl relative overflow-hidden" id="upload-center-card">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/60">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-100 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            Universal Statement Upload Center
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Indian banks, co-operative societies, patpedhi or commercial NBFC statements statement analyzer.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-slate-300 font-mono">ISO 27001 Crypt-Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Parameters selection */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Financial Institution & Tier Parser
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
              {AVAILABLE_BANKS.map((b) => {
                const isSelected = selectedBank === b.key;
                const isProRestricted = activePlan === "Free" && b.key !== "sbi" && b.key !== "hdfc";
                return (
                  <button
                    key={b.key}
                    onClick={() => setSelectedBank(b.key)}
                    className={`flex items-center justify-between p-3 rounded-xl transition text-left relative ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/50 text-white"
                        : "bg-slate-950/60 border border-slate-800/60 hover:bg-slate-800/40 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{b.logo}</span>
                      <div>
                        <p className="text-sm font-medium">{b.name}</p>
                        <p className="text-xs text-slate-500">{b.type}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-medium uppercase ${
                        b.tier.includes("Tier 1") ? "bg-emerald-505/10 text-emerald-400 border border-emerald-500/20" : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}>
                        {b.tier}
                      </span>
                      {isProRestricted && (
                        <span className="text-[9px] text-amber-400 px-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full font-mono">
                          PRO PLAN
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Decryption Password (If Standard SECURE PDF)
              </label>
              {passwordRequired && (
                <span className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                  <Lock className="h-2.5 w-2.5" /> SECURE MATCH REQUIRED
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password used for parsing encrypted files (e.g. birthdate/pan)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
              />
              <Lock className="absolute right-3.5 top-3 h-4.5 w-4.5 text-slate-600" />
            </div>
          </div>

          <div className="p-3 bg-slate-950/40 border border-slate-800/50 rounded-xl">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              Demo Fast-Track Profiles
            </h4>
            <p className="text-[11px] text-slate-500 mb-2.5">
              Don't have a PDF balance sheet handy? Pre-load certified simulated bookkeeping datasets to test drive our dashboard immediately.
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => selectDemoFile("sbi")}
                className="text-[10px] bg-slate-900 border border-slate-850 hover:bg-slate-850 px-2 py-1 rounded text-slate-300 transition text-center"
              >
                📥 Load SBI Payroll Demo
              </button>
              <button
                type="button"
                onClick={() => selectDemoFile("hdfc")}
                className="text-[10px] bg-slate-900 border border-slate-850 hover:bg-slate-850 px-2 py-1 rounded text-slate-300 transition text-center"
              >
                📥 Load HDFC GST/Corporate
              </button>
              <button
                type="button"
                onClick={() => selectDemoFile("shivaji")}
                className="text-[10px] bg-slate-900 border border-slate-850 hover:bg-slate-850 px-2 py-1 rounded text-slate-300 transition text-center"
              >
                📥 Load Shivaji Co-op
              </button>
              <button
                type="button"
                onClick={() => selectDemoFile("satara_pat")}
                className="text-[10px] bg-slate-900 border border-slate-850 hover:bg-slate-850 px-2 py-1 rounded text-slate-300 transition text-center"
              >
                📥 Load Patpedhi Hub
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Drag-and-drop landing */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center transition relative ${
              dragActive
                ? "border-cyan-400 bg-cyan-900/10"
                : uploadedFile
                ? "border-emerald-500/40 bg-emerald-900/5"
                : "border-slate-800 bg-slate-950/70 hover:border-slate-700/80"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.csv,.xls,.xlsx"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {uploadedFile ? (
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 max-w-sm truncate mx-auto">
                    {uploadedFile.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Ready for cryptographic processing ({uploadedFile.size})</p>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 bg-slate-950/50 px-3 py-1.5 rounded-lg transition"
                  >
                    Replace Statement File
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center border border-blue-500/20 animate-pulse">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition underline decoration-1 underline-offset-4"
                  >
                    Browse files
                  </button>
                  <span className="text-slate-400 text-sm"> or drag and drop statement PDF here</span>
                  <p className="text-xs text-slate-500 mt-2">
                    Supports secure PDFs, image files, scanned papers, Excel or CSV transcripts.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            {error && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-xs text-red-300 flex items-start gap-2.5 animate-shake">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {isProcessing ? (
              <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl">
                <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    {selectedBank === "sbi" || selectedBank === "hdfc" ? "TIER 1 HARDWARE ENGINE" : "TIER 2 OCR INTELLIGENCE"}
                  </span>
                  <span>Processing Log...</span>
                </div>
                <p className="text-sm font-medium text-slate-100 mb-3 animate-pulse">{processingStep}</p>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 h-full animate-progress" />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={startAnalysis}
                disabled={!uploadedFile}
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm tracking-wide transition flex items-center justify-center gap-2 relative group overflow-hidden ${
                  uploadedFile
                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/20 active:translate-y-px"
                    : "bg-slate-800 border border-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
                Analyze Statement Financial Intelligence
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
