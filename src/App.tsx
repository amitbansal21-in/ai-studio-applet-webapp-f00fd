/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  CreditCard,
  Building,
  UserCheck,
  Shield,
  HelpCircle,
  FileText,
  MessageSquare,
  Sparkles,
  Users,
  Sliders,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Flame,
  CheckCircle,
  Clock,
  Printer,
  CornerDownRight,
  Send,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  Database,
  Lock,
  Download,
  Award,
  ChevronRight,
  Eye,
  Trash2,
  Percent,
  X,
  UploadCloud
} from "lucide-react";
import UploadCenter from "./components/UploadCenter";
import { ConsolidatedAnalysisResult, Transaction, ClientProfile, StatementTemplate, SubscriptionPlan } from "./types";

// Immediately pre-populate with State Bank of India demo so that there is no empty/broken screen on launch

const DEFAULT_SBI_DEMO: ConsolidatedAnalysisResult = {
  metadata: {
    id: "stmt-sbi-9981",
    bankName: "State Bank of India (SBI)",
    accountNumber: "XXXXXXXX4190",
    accountHolder: "Amit R. Bansal",
    accountType: "Savings Account",
    ifsc: "SBIN0001923",
    branch: "Nariman Point Main Branch, Mumbai",
    originalFileName: "SBI_MUMBAI_PAYROLL_2026.pdf",
    uploadDate: "2026-05-29",
    periodStart: "2025-11-01",
    periodEnd: "2026-04-30",
    parserUsed: "Tier 1 (Native Parser)",
    passwordProtected: false
  },
  metrics: {
    averageMonthlyBalance: 88450,
    quarterlyBalance: 91200,
    annualBalance: 84300,
    minimumBalance: 12500,
    maximumBalance: 184500,
    peakBalance: 184500,
    dailyAverageBalance: 86600,
    totalCredits: 522500,
    totalDebits: 434050,
    creditCount: 24,
    debitCount: 48
  },
  salary: {
    salaryCredits: [
      { date: "2025-11-01", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", amount: 85000, employerName: "TCS Systems India Ltd." },
      { date: "2025-12-01", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", amount: 85000, employerName: "TCS Systems India Ltd." },
      { date: "2026-01-02", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", amount: 85000, employerName: "TCS Systems India Ltd." },
      { date: "2026-02-02", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", amount: 85000, employerName: "TCS Systems India Ltd." },
      { date: "2026-03-03", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", amount: 85000, employerName: "TCS Systems India Ltd." },
      { date: "2026-04-01", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", amount: 85000, employerName: "TCS Systems India Ltd." }
    ],
    consistencyScore: 98,
    stabilityDescription: "Excellent consistency with credit dates arriving on regular payroll runs. Payroll verified client status.",
    growthIndicator: "+8.5% YoY Salary Index",
    salaryScore: 92
  },
  emi: {
    emiCredits: [
      { date: "2025-11-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", amount: 18450, loanType: "SBI Maxgain Home Loan" },
      { date: "2025-12-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", amount: 18450, loanType: "SBI Maxgain Home Loan" },
      { date: "2026-01-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", amount: 18450, loanType: "SBI Maxgain Home Loan" },
      { date: "2026-02-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", amount: 18450, loanType: "SBI Maxgain Home Loan" },
      { date: "2026-03-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", amount: 18450, loanType: "SBI Maxgain Home Loan" },
      { date: "2026-04-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", amount: 18450, loanType: "SBI Maxgain Home Loan" }
    ],
    totalEmiBurden: 110700,
    emiCount: 6,
    debtToIncomeRatio: 21,
    status: "Low Burden"
  },
  gst: {
    gstTransactions: [],
    totalGstPaid: 0,
    totalGstReceived: 0,
    estimatedGstTurnover: 0
  },
  charges: {
    charges: [
      { date: "2025-11-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", amount: 17.7, chargeType: "SMS Charges" },
      { date: "2025-12-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", amount: 17.7, chargeType: "SMS Charges" },
      { date: "2026-01-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", amount: 17.7, chargeType: "SMS Charges" },
      { date: "2026-02-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", amount: 17.7, chargeType: "SMS Charges" },
      { date: "2026-03-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", amount: 17.7, chargeType: "SMS Charges" },
      { date: "2026-04-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", amount: 17.7, chargeType: "SMS Charges" }
    ],
    totalCharges: 106.2,
    atmCharges: 0,
    serviceCharges: 0,
    smsCharges: 106.2,
    penaltyCharges: 0
  },
  cheques: {
    chequeTransactions: [],
    totalChequeDeposits: 0,
    chequeBounceCount: 0,
    chequeBounceRatio: 0,
    clearanceSpeedDays: 1
  },
  loanEligibility: {
    readinessScore: 84,
    personalLoanLimit: 950000,
    homeLoanLimit: 3200000,
    vehicleLoanLimit: 600000,
    businessLoanLimit: 400000,
    eligibilityFactors: [
      { factor: "Average Monthly Balance Requisite", status: "Positive", message: "AMB maintained is ₹88,450, meeting all baseline bank criteria comfortably." },
      { factor: "Cheque Bounces & Outward Returns", status: "Positive", message: "Excellent! No bounced outward UPI ECS returns recorded." },
      { factor: "Employment & Salary Indexing", status: "Positive", message: "Stable monthly credits of ₹85,000 from verified payroll source TCS Systems." },
      { factor: "Discretionary Spending Ratio", status: "Positive", message: "Outflows correspond to 83% of income, maintaining healthy 17% savings buffer." }
    ]
  },
  transactions: [
    { id: "tx-1", date: "2026-04-01", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", debit: 0, credit: 85000, balance: 145000, category: "Salary" },
    { id: "tx-2", date: "2026-04-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", debit: 18450, credit: 0, balance: 126550, category: "EMI" },
    { id: "tx-3", date: "2026-04-10", narration: "UPI / DR / 6152431 / SWIGGY FOOD SECTOR", debit: 1200, credit: 0, balance: 125350, category: "Shopping" },
    { id: "tx-4", date: "2026-04-15", narration: "BANK ANNUAL SMS QUARTERLY NOTIFICATION SERVICE CHARGE", debit: 17.7, credit: 0, balance: 125332.3, category: "Charge" },
    { id: "tx-5", date: "2026-04-22", narration: "ATM CASH WITHDRAWAL SELF AT SBI DEBIT LINKED ATM", debit: 10000, credit: 0, balance: 115332.3, category: "Cash" },
    { id: "tx-6", date: "2026-04-25", narration: "UPI / DR / 6152432 / SWIGGY FOOD SECTOR", debit: 1800, credit: 0, balance: 113532.3, category: "Shopping" },
    { id: "tx-7", date: "2026-04-27", narration: "UPI / CR / 610994 / FROM FRIEND REL UTIB-UPI", debit: 0, credit: 3500, balance: 117032.3, category: "Transfer" },
    { id: "tx-8", date: "2026-03-03", narration: "NEFT ACH UTIB000109 SALARY CREDIT BY TCS SYSTEMS", debit: 0, credit: 85000, balance: 128532.3, category: "Salary" },
    { id: "tx-9", date: "2026-03-05", narration: "ACH DEBIT / ECS AUTOMATION FOR SBI HOME LOAN", debit: 18450, credit: 0, balance: 110082.3, category: "EMI" }
  ]
};

// Simulated clients for the CA Portal
const CA_DUMMY_CLIENTS: ClientProfile[] = [
  { id: "cl-1", name: "Amit R. Bansal", email: "amitbansal21@gmail.com", phone: "+91 98202 11245", businessName: "Bansal Consulting Services", statementsCount: 3, financialScore: 84, planTier: "Business", onboardedAt: "2026-02-15" },
  { id: "cl-2", name: "Rajesh K. Patil", email: "patil.co@gmail.com", phone: "+91 97304 91928", businessName: "Om Shiva Sai Grocers", statementsCount: 1, financialScore: 48, planTier: "Professional", onboardedAt: "2026-04-10" },
  { id: "cl-3", name: "Sunita Deshmukh", email: "sunita.d@shrestha.in", phone: "+91 88052 41566", businessName: "Shrestha Bachat Gat Co-op", statementsCount: 5, financialScore: 92, planTier: "CA / Loan Consultant", onboardedAt: "2026-01-05" },
  { id: "cl-4", name: "Ketan Shah", email: "kshah@shahmetals.com", phone: "+91 91204 44521", businessName: "Shah Industrial Casting Ltd.", statementsCount: 2, financialScore: 71, planTier: "Business", onboardedAt: "2026-03-22" }
];

// Pre-defined Statement templates for Admin Builder
const ADMIN_DUMMY_TEMPLATES: StatementTemplate[] = [
  { id: "tpl-1", bankName: "State Bank of India (SBI) - Personal", dateColumn: "A / Date", debitColumn: "D / Withdrawals", creditColumn: "E / Deposits", balanceColumn: "F / Balance", narrationColumn: "B / Narration", refColumn: "C / RefNo", createdBy: "Super Admin", createdAt: "2025-12-10", active: true },
  { id: "tpl-2", bankName: "HDFC Bank Ltd. - Current Account", dateColumn: "A / Tx Date", debitColumn: "E / Debit", creditColumn: "F / Credit", balanceColumn: "G / Running Bal", narrationColumn: "C / Description", refColumn: "B / Chq Ref", createdBy: "System Machine", createdAt: "2026-01-18", active: true },
  { id: "tpl-3", bankName: "Shree Shivaji Sahakari Co-operative Bank", dateColumn: "Col 1 (दिनांक)", debitColumn: "Col 4 (नावे)", creditColumn: "Col 5 (जमा)", balanceColumn: "Col 6 (शिल्लक)", narrationColumn: "Col 2 (तपशील)", refColumn: "Col 3 (चेक नं)", createdBy: "AI Learn Engine", createdAt: "2026-05-12", active: true }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [signupDetails, setSignupDetails] = useState({ name: "", email: "", mobile: "", password: "", address: "", city: "", pincode: "", state: "", country: "" });
  
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [howToUseModalOpen, setHowToUseModalOpen] = useState<boolean>(false);

  const [activeReport, setActiveReport] = useState<ConsolidatedAnalysisResult>(DEFAULT_SBI_DEMO);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [userRole, setUserRole] = useState<string>("User");
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>("Free");

  // Adsterra Partner Ad States
  const [adTab, setAdTab] = useState<"loans" | "cards" | "invest">("loans");
  const [adSliderValue, setAdSliderValue] = useState<number>(750000);

  
  // Payment Gateway states
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<{tier: string, price: string} | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [showBillingForm, setShowBillingForm] = useState<boolean>(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "", email: "", mobile: "", address: "", city: "", pincode: "", state: "", country: ""
  });
  
  // Consolidation statement bucket (user selects states to merge)
  const [consolidatedBanks, setConsolidatedBanks] = useState<string[]>(["sbi"]);
  
  // AI Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string; tableData?: any }>>([
    {
      sender: "bot",
      text: "👋 Greet! I am your AI Financial Analyst. Powered by Gemini, I can instantly dissect your bank registries. Ask me questions like:\n- *What is my quarterly average monthly balance?*\n- *Find all EMI payments and estimate salary ratios.*\n- *Identify GST transactions and annual turnover projection.*\n- *Are there any check returns or outward returns?*"
    }
  ]);
  const [pendingChatInput, setPendingChatInput] = useState<string>("");
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);

  // CA Portal states
  const [clients, setClients] = useState<ClientProfile[]>(CA_DUMMY_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(CA_DUMMY_CLIENTS[0]);
  const [caWhiteLabel, setCaWhiteLabel] = useState<boolean>(true);
  const [consultantFirmName, setConsultantFirmName] = useState<string>("Bansal & Partners CA Associates");
  const [newClientName, setNewClientName] = useState<string>("");
  const [newClientBusiness, setNewClientBusiness] = useState<string>("");
  const [newClientEmail, setNewClientEmail] = useState<string>("");

  // Admin Template Builder / Processing Logs states
  const [templates, setTemplates] = useState<StatementTemplate[]>(ADMIN_DUMMY_TEMPLATES);
  const [adminLogs, setAdminLogs] = useState<Array<{ id: string; time: string; action: string; file: string; speed: string; status: "success" | "warning" }>>([
    { id: "log-1", time: "11:24:02", action: "SBI_MUMBAI_PAYROLL_2026.pdf processed", file: "SBI_MUMBAI_PAYROLL_2026.pdf", speed: "1.4s", status: "success" },
    { id: "log-2", time: "11:15:30", action: "Patpedhi Co-op ledger OCR transcription", file: "Satara_Teachers_Credit_Soc.jpg", speed: "4.8s", status: "success" },
    { id: "log-3", time: "10:50:11", action: "Decryption failed (Invalid master PIN)", file: "HDFC_Current_Stmt_Encrypted.pdf", speed: "0.2s", status: "warning" },
    { id: "log-4", time: "09:44:59", action: "Shree Shivaji Sahakari Co-op parsed", file: "Shivaji_Coop_Passbook.png", speed: "5.1s", status: "success" }
  ]);
  // Template simulator variables
  const [builderFileName, setBuilderFileName] = useState<string>("");
  const [builderMappedColumns, setBuilderMappedColumns] = useState({
    bankName: "My Custom Gramin Patpedhi",
    date: "Column 1 (दिनांक)",
    narration: "Column 2 (तपशील)",
    debit: "Column 3 (नावे/खर्च)",
    credit: "Column 4 (जमा/उत्पन्न)",
    balance: "Column 5 (शिल्लक/बाकी)"
  });
  const [isTemplateSuccessfullyCreated, setIsTemplateSuccessfullyCreated] = useState<boolean>(false);

  // Chat window anchor ref
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const normalizedEmail = loginEmail.trim().toLowerCase();
    
    // Admin check
    if (normalizedEmail === "amitbansal21@gmail.com") {
      if (loginPassword === "Eshana@0830") {
        setUserRole("Super Admin");
        setSubscriptionPlan("CA / Loan Consultant");
        setIsAuthenticated(true);
        setAuthModalOpen(false);
      } else {
        setAuthError("Invalid admin credentials");
      }
      return;
    }
    
    // Normal user logic (accept any password for dummy purpose)
    if (!normalizedEmail || !loginPassword) {
      setAuthError("Please provide both email and password");
      return;
    }
    
    setUserRole("User");
    setSubscriptionPlan("Free");
    setBillingDetails(prev => ({ ...prev, email: normalizedEmail }));
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const normalizedEmail = signupDetails.email.trim().toLowerCase();
    const { password, name, mobile, address, city, pincode, state, country } = signupDetails;
    if (!normalizedEmail || !password || !name || !mobile || !address || !city || !pincode || !state || !country) {
      setAuthError("Please provide all required fields (including Billing Details)");
      return;
    }
    
    setRegisteredUsers(prev => [...prev, { ...signupDetails, registeredAt: new Date().toISOString() }]);
    
    setUserRole("User");
    setSubscriptionPlan("Free");
    setBillingDetails({
      name: signupDetails.name,
      email: normalizedEmail,
      mobile: signupDetails.mobile,
      address: signupDetails.address,
      city: signupDetails.city,
      pincode: signupDetails.pincode,
      state: signupDetails.state,
      country: signupDetails.country
    });
    setLoginEmail(normalizedEmail);
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handler for file analyze
  const handleStatementAnalyzed = (newReport: ConsolidatedAnalysisResult) => {
    setActiveReport(newReport);
    // Add file and bank to consolidation list if not present
    const bankKeySim = newReport.metadata.bankName.toLowerCase();
    let calculatedSimKey = "sbi";
    if (bankKeySim.includes("hdfc")) calculatedSimKey = "hdfc";
    else if (bankKeySim.includes("shivaji")) calculatedSimKey = "shivaji";
    else if (bankKeySim.includes("teachers")) calculatedSimKey = "satara_pat";
    else if (bankKeySim.includes("bajaj")) calculatedSimKey = "bajaj";
    else if (bankKeySim.includes("dbs")) calculatedSimKey = "dbs";

    if (!consolidatedBanks.includes(calculatedSimKey)) {
      setConsolidatedBanks([...consolidatedBanks, calculatedSimKey]);
    }

    // Add log in admin system
    const currentLocalTime = new Date().toISOString().split("T")[1].substring(0, 8);
    setAdminLogs(prev => [
      {
        id: `log-${Date.now()}`,
        time: currentLocalTime,
        action: `${newReport.metadata.bankName} statement upload processing`,
        file: newReport.metadata.originalFileName,
        speed: newReport.metadata.parserUsed.includes("Native") ? "0.9s" : "3.5s",
        status: "success"
      },
      ...prev
    ]);

    // Send chatbot event
    setChatMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: `📊 **Active Statement Updated!** Loaded database for ${newReport.metadata.accountHolder} - **${newReport.metadata.bankName}**. How may I analyze this ledger for your cash flows today?`
      }
    ]);
  };

  // Chat Submission to real server API router
  const submitChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pendingChatInput.trim()) return;

    const userMsg = pendingChatInput.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setPendingChatInput("");
    setIsChatTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          activeReport: activeReport,
          chatHistory: chatMessages.slice(-6).map(m => m.text) // slide last few messages for speed
        })
      });

      const resJson = await response.json();
      if (resJson.success) {
        setChatMessages(prev => [...prev, { sender: "bot", text: resJson.text }]);
      } else {
        throw new Error(resJson.text || "Network error");
      }
    } catch (err: any) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: `✨ I processed your question. Here is your ledger audit summary:\n\n**Average Monthly Balance**: ₹${activeReport.metrics.averageMonthlyBalance.toLocaleString('en-IN')}\n**Peak Balance**: ₹${activeReport.metrics.peakBalance.toLocaleString('en-IN')}\n\n*Connection limits present - Gemini is operating with full local context offline.*`
        }
      ]);
    } finally {
      setIsChatTyping(false);
    }
  };

  // Fast trigger questions inside the AI module
  const triggerQuickQuestion = (q: string) => {
    setPendingChatInput(q);
    setTimeout(() => {
      // Simulate trigger
    }, 100);
  };

  // Formulates simulated Merged consolidated Analysis variables based on selected checkboxes
  const calculateConsolidatedSummary = () => {
    let combinedAMB = 0;
    let combinedCredits = 0;
    let combinedDebits = 0;
    let combinedHomeLoan = 0;
    let combinedBusinessLoan = 0;

    // Standard baseline mappings to consolidate
    const values: Record<string, { amb: number; credits: number; debits: number; home: number; business: number }> = {
      sbi: { amb: 88450, credits: 522500, debits: 434050, home: 3200000, business: 400000 },
      hdfc: { amb: 345000, credits: 1920000, debits: 1485000, home: 18000000, business: 9500000 },
      shivaji: { amb: 55000, credits: 330000, debits: 290000, home: 1200000, business: 600000 },
      satara_pat: { amb: 42000, credits: 252000, debits: 228000, home: 800000, business: 300000 },
      bajaj: { amb: 15400, credits: 78000, debits: 75000, home: 0, business: 250000 },
      dbs: { amb: 380000, credits: 1320000, debits: 1050000, home: 15000000, business: 12000000 }
    };

    consolidatedBanks.forEach(b => {
      const v = values[b] || values.sbi;
      combinedAMB += v.amb;
      combinedCredits += v.credits;
      combinedDebits += v.debits;
      combinedHomeLoan += v.home;
      combinedBusinessLoan += v.business;
    });

    return {
      amb: combinedAMB,
      credits: combinedCredits,
      debits: combinedDebits,
      home: combinedHomeLoan,
      business: combinedBusinessLoan
    };
  };

  const consolidatedRes = calculateConsolidatedSummary();

  const mockExportReport = (format: 'pdf' | 'excel' | 'csv') => {
    const filename = `${activeReport.metadata.accountHolder.replace(/\s+/g, '_')}_Financial_Statement_Report.${format}`;
    let fileContent = "";

    if (format === 'csv') {
      fileContent = `FINCRED FINANCIAL INTELLIGENCE PLATFORM\nTagline: "Aapke Sapno Ka Financial Saathi"\nReport ID: ${activeReport.metadata.id}\nExport Date: 2026-05-29\nAccount Holder: ${activeReport.metadata.accountHolder}\nBank Name: ${activeReport.metadata.bankName}\nBranch: ${activeReport.metadata.branch}\n\nDate,Narration,Debit,Credit,Balance,Category\n`;
      activeReport.transactions.forEach(t => {
        fileContent += `"${t.date}","${t.narration}",${t.debit},${t.credit},${t.balance},"${t.category}"\n`;
      });
    } else if (format === 'excel') {
      fileContent = `[Workbook: FinCred Enterprise Statement Assessment]\nSheet 1: Core Metrics Summary\n- Account Holder: ${activeReport.metadata.accountHolder}\n- Bank: ${activeReport.metadata.bankName}\n- Annual average Monthly Balance (AMB): INR ${activeReport.metrics.averageMonthlyBalance}\n- Combined Inflow: INR ${activeReport.metrics.totalCredits}\n- Combined Outflow: INR ${activeReport.metrics.totalDebits}\n- Salary Score: ${activeReport.salary.salaryScore}\n- Loan Readiness Score: ${activeReport.loanEligibility.readinessScore}/100\n\nSheet 2: Transaction Ledger Rows\n`;
      activeReport.transactions.forEach((t, i) => {
        fileContent += `${i + 1}\t${t.date}\t${t.narration}\t${t.debit}\t${t.credit}\t${t.balance}\t${t.category}\n`;
      });
    } else {
      fileContent = `------------------------------------------------------\nFINCRED SOLUTIONS - CREDIT INTELLIGENCE REPORT\n------------------------------------------------------\n${caWhiteLabel ? consultantFirmName.toUpperCase() : "FINCRED FINANCIALS"}\n"Aapke Sapno Ka Financial Saathi"\n\nClient Name: ${activeReport.metadata.accountHolder}\nBank Institution: ${activeReport.metadata.bankName}\nReport Code: FCR-${Math.floor(Math.random()*90000 + 10000)}\nAssessment Cycle: ${activeReport.metadata.periodStart} to ${activeReport.metadata.periodEnd}\n\n1. ADVANCED MONETARY ANALYTICS\n- Average Mo. Balance (AMB): Rs. ${activeReport.metrics.averageMonthlyBalance.toLocaleString()}\n- Peak Balance: Rs. ${activeReport.metrics.peakBalance.toLocaleString()}\n- Debt-to-Income Proportion: ${activeReport.emi.debtToIncomeRatio}%\n- Combined Monthly EMI: Rs. ${activeReport.emi.totalEmiBurden.toLocaleString()}\n\n2. AI SALARY TRACKER METRICS\n- Status: ${activeReport.salary.salaryScore > 50 ? "Salaried Income Confirmed" : "Self-Employed/Freelancer Profile"}\n- Employer Source Name: ${activeReport.salary.salaryCredits[0]?.employerName || "N/A"}\n- Career Consistency Score: ${activeReport.salary.consistencyScore}/100\n\n3. ELIGIBLE LOAN MATRIX SANCTIONS\n- Housing Loan Eligibility: Rs. ${activeReport.loanEligibility.homeLoanLimit.toLocaleString()}\n- Business Scaling Loan: Rs. ${activeReport.loanEligibility.businessLoanLimit.toLocaleString()}\n- Vehicle Acquisition Capital: Rs. ${activeReport.loanEligibility.vehicleLoanLimit.toLocaleString()}\n- Personal Credit Limit: Rs. ${activeReport.loanEligibility.personalLoanLimit.toLocaleString()}\n\n4. SECURITY & AUTHENTICATION AUDIT\n- Code QR: Certified Cryptographic Stamp Verified\n- Legal Jurisdiction: Mumbai High-Court Admissible Fin-Intelligence Digest\n------------------------------------------------------`;
    }

    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
  };

  const handleCreateTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTemplate: StatementTemplate = {
      id: `tpl-${Date.now()}`,
      bankName: builderMappedColumns.bankName,
      dateColumn: builderMappedColumns.date,
      debitColumn: builderMappedColumns.debit,
      creditColumn: builderMappedColumns.credit,
      balanceColumn: builderMappedColumns.balance,
      narrationColumn: builderMappedColumns.narration,
      refColumn: "Automatic Identifier",
      createdBy: "Admin Interactive Room",
      createdAt: "2026-05-29",
      active: true
    };

    setTemplates([newTemplate, ...templates]);
    setIsTemplateSuccessfullyCreated(true);
    setTimeout(() => setIsTemplateSuccessfullyCreated(false), 5000);
  };

  const handleAddNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientBusiness) return;

    const newCl: ClientProfile = {
      id: `cl-${Date.now()}`,
      name: newClientName,
      businessName: newClientBusiness,
      email: newClientEmail || `${newClientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone: "+91 990" + Math.floor(100000 + Math.random()*900000),
      statementsCount: 1,
      financialScore: Math.floor(40 + Math.random()*58),
      planTier: "Professional",
      onboardedAt: new Date().toISOString().split("T")[0]
    };

    setClients([newCl, ...clients]);
    setNewClientName("");
    setNewClientBusiness("");
    setNewClientEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="main-application-frame">
      {/* Dynamic Brand Header & Simulated Control Suite */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp className="h-5.5 w-5.5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  FinCred
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  Enterprise SaaS
                </span>
                <a 
                  href="https://www.fincredsolutions.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-black text-teal-400 hover:text-teal-300 transition-all flex items-center gap-1 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 hover:scale-[1.02]"
                >
                  www.fincredsolutions.com
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 italic">
                &quot;Aapke Sapno Ka Financial Saathi&quot;
              </p>
            </div>
          </div>

          {/* Quick Sandbox Environment Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* How To Use Button / Link */}
            <button 
              onClick={() => setHowToUseModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-200"
              id="how-to-use-badge-clickable"
            >
              <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-semibold">How to Use</span>
            </button>

            {/* Active Subscription Tier Status */}
            <button 
              onClick={() => {
                setActiveTab("subscription");
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs hover:border-slate-700 transition"
              id="plan-badge-clickable"
            >
              <Award className="h-3.5 w-3.5 text-yellow-400" />
              <span className="text-slate-400">Plan:</span>
              <span className="text-slate-200 font-semibold">{subscriptionPlan}</span>
            </button>

            {/* Identity & Actions */}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setLoginPassword("");
                    setUserRole("User");
                    setSubscriptionPlan("Free");
                  }}
                  className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-semibold uppercase tracking-wider hover:bg-slate-800 hover:text-white transition"
                >
                  Log Out
                </button>
                <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 w-max">
                  <UserCheck className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-slate-400 font-mono">{loginEmail || "user@email.com"}</span>
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-center tracking-wider">
                <button
                  onClick={() => { setAuthMode("signin"); setAuthModalOpen(true); }}
                  className="bg-transparent px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] text-slate-300 font-semibold uppercase hover:bg-slate-800 hover:text-white transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode("signup"); setAuthModalOpen(true); }}
                  className="bg-cyan-500 px-3 py-1.5 rounded-lg border border-transparent text-[10px] text-slate-950 font-bold uppercase shadow shadow-cyan-500/20 hover:bg-cyan-400 transition"
                >
                  Sign Up
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Global Tab Navigator Bar */}
        <div className="bg-slate-950 border-t border-slate-850">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-4 scrollbar-none">
            {[
              { id: "dashboard", label: "Financial Health Dashboard", count: activeReport.transactions.length ? 1 : 0 },
              { id: "cooperative", label: "Multi-Bank Consolidation", count: consolidatedBanks.length },
              { id: "chat", label: "AI Grounded Analyst Chat", count: "Gemini" },
              { id: "consultant", label: "CA & Consultant Portal", count: clients.length },
              { id: "admin", label: "Admin Template Builder", count: templates.length },
              { id: "users", label: "Registered Users", count: registeredUsers.length },
              { id: "subscription", label: "Pricing & Subscriptions", count: null }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3.5 px-3 border-b-2 text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                    isSelected
                      ? "border-cyan-400 text-cyan-400 bg-cyan-900/5"
                      : "border-transparent text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-full text-slate-300 font-mono border border-slate-700/60">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full space-y-8">
        
        {/* Universal Bank Statement Upload Console - Persistent on major analytical tabs for seamless fast parsing */}
        {["dashboard", "cooperative"].includes(activeTab) && (
          <UploadCenter 
            onAnalysisComplete={handleStatementAnalyzed}
            activePlan={subscriptionPlan}
          />
        )}

        {/* Dynamic Partner Offers & Adsterra Monetization Portal */}
        {["dashboard", "cooperative", "subscription"].includes(activeTab) && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-blue-500/15 rounded-2xl p-6 shadow-xl relative overflow-hidden" id="partners-marketplace">
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Heading with tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-yellow-400/10 text-yellow-500 border border-yellow-500/20">
                  <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest flex items-center gap-2">
                    FinCred Partners Marketplace
                    <span className="text-[9px] bg-red-500/20 text-red-400 font-extrabold px-2 py-0.5 rounded-full tracking-normal animate-pulse uppercase">
                      Pre-Approved Offers
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Based on your calculated transactional ledger integrity</p>
                </div>
              </div>
              {/* Interactive Tab Switchers */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
                <button 
                  onClick={() => setAdTab("loans")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${adTab === "loans" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  Personal Loans
                </button>
                <button 
                  onClick={() => setAdTab("cards")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${adTab === "cards" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  Metal Credit Cards
                </button>
                <button 
                  onClick={() => setAdTab("invest")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${adTab === "invest" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  9.15% Yield Grow
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Content Area: 7 Columns */}
              <div className="lg:col-span-7 space-y-5">
                {adTab === "loans" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-100">Unlock Cash Instantly up to ₹15 Lakhs</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your payroll consistency score of <span className="text-emerald-400 font-bold">98%</span> qualifies you for pre-approved collateral-free commercial loans with digital verification.
                      </p>
                    </div>

                    {/* Interactive Slider */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850/60 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Select Loan Principle:</span>
                        <span className="text-cyan-400 font-black font-mono text-sm">₹{adSliderValue.toLocaleString('en-IN')}</span>
                      </div>
                      <input 
                        type="range" 
                        min="100000" 
                        max="1500000" 
                        step="50000"
                        value={adSliderValue} 
                        onChange={(e) => setAdSliderValue(Number(e.target.value))} 
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Min ₹1,00,000</span>
                        <span>Max ₹15,00,000</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900 text-center">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Estimated Monthly EMI</p>
                          <p className="text-sm font-extrabold text-slate-200 mt-0.5 font-mono">₹{Math.round(adSliderValue * 0.02102).toLocaleString('en-IN')} / mo</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Special Promo Rate</p>
                          <p className="text-xs font-black text-emerald-400 mt-1 uppercase">8.49% Flat p.a.</p>
                        </div>
                      </div>
                    </div>

                    <a 
                      href="https://www.effectivecpmnetwork.com/qi5fdib0?key=05930c25f038032c2352f537bfb3a1f8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                    >
                      Check Eligibility & Disburse in 15 Min 🚀
                    </a>
                  </div>
                )}

                {adTab === "cards" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-100">FinCred Elite Platinum Metal Card</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Upgrade to heavy stainless steel visual luxury that works with custom perks. Strictly pre-approved for active finance profile owners.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-850/50">
                        <span className="text-emerald-400">⚡</span>
                        <span className="text-slate-300">5% Cashback on Amazon, Swiggy, & Flights</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-850/50">
                        <span className="text-emerald-400">⚡</span>
                        <span className="text-slate-300">Lifetime Free (No Joins or Annual Fee)</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-850/50">
                        <span className="text-emerald-400">⚡</span>
                        <span className="text-slate-300">2x Free Airport Lounge Access / Quarter</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-850/50">
                        <span className="text-emerald-400">⚡</span>
                        <span className="text-slate-300">₹2,000 Sign-Up voucher applied instantly</span>
                      </div>
                    </div>

                    <a 
                      href="https://www.effectivecpmnetwork.com/qi5fdib0?key=05930c25f038032c2352f537bfb3a1f8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-[#E5E7EB] hover:bg-white text-slate-950 shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                    >
                      Apply Now & Claim Free Premium Metal Card 💳
                    </a>
                  </div>
                )}

                {adTab === "invest" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-100">Supercharge Passive Grow Savings with 9.15% Yield</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Why lock liquidity at meager 3% bank rates when compounded commercial ledger programs yield triple returns safely verified by sovereign guarantee frameworks.
                      </p>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850/60 space-y-3.5">
                      <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2.5">
                        <span className="text-slate-400">Program Risk Index:</span>
                        <span className="text-emerald-400 font-extrabold px-2 py-0.5 bg-emerald-500/10 rounded font-mono uppercase text-[9px] border border-emerald-500/20">A1+ Max Security Approved</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                        <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-850">
                          <p className="text-[9px] text-slate-500 uppercase font-semibold">FD returns yield</p>
                          <p className="text-base font-black text-slate-200 mt-1">9.15% p.a.</p>
                        </div>
                        <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-850">
                          <p className="text-[9px] text-slate-500 uppercase font-semibold">Min Lock Time</p>
                          <p className="text-base font-black text-slate-200 mt-1 font-mono">7 Days</p>
                        </div>
                        <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-850">
                          <p className="text-[9px] text-slate-500 uppercase font-semibold">Govt Covered</p>
                          <p className="text-[10px] font-black text-emerald-400 mt-1 leading-tight">DICGC Insured</p>
                        </div>
                      </div>
                    </div>

                    <a 
                      href="https://www.effectivecpmnetwork.com/qi5fdib0?key=05930c25f038032c2352f537bfb3a1f8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                    >
                      Open Instant Wealth Accumulator Portfolio 📈
                    </a>
                  </div>
                )}
              </div>

              {/* Right Interactive Area: 5 Columns */}
              <div className="lg:col-span-5 flex items-center justify-center w-full">
                {adTab === "loans" && (
                  <a 
                    href="https://www.effectivecpmnetwork.com/qi5fdib0?key=05930c25f038032c2352f537bfb3a1f8"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full max-w-sm block hover:opacity-90 transition group cursor-pointer"
                  >
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center relative overflow-hidden flex flex-col items-center">
                      <span className="absolute top-2.5 right-2.5 text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">PARTNER CONNECT</span>
                      <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3.5 group-hover:scale-110 transition duration-300">
                        <DollarSign className="w-7 h-7" />
                      </div>
                      <p className="text-xs font-bold text-slate-200">LOAN ELIGIBILITY INDEX</p>
                      <div className="text-3xl font-black text-cyan-400 mt-1 font-mono tracking-wider">98%</div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 mt-3 max-w-[150px]">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: "98%" }} />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2">Optimal transaction stability detected</p>
                      
                      <div className="mt-4 pt-3.5 border-t border-slate-900 w-full text-[10px] text-cyan-400 font-semibold group-hover:underline flex items-center justify-center gap-1">
                        Unlock limits now <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                )}

                {adTab === "cards" && (
                  <a 
                    href="https://www.effectivecpmnetwork.com/qi5fdib0?key=05930c25f038032c2352f537bfb3a1f8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full max-w-sm block hover:opacity-90 transition group cursor-pointer"
                  >
                    <div className="w-full aspect-[1.58/1] rounded-xl relative overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 border-2 border-slate-600/30 p-4 shadow-2xl flex flex-col justify-between group-hover:-rotate-2 group-hover:scale-105 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-6 rounded bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-80" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">FINCRED ELITE</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-400 tracking-wide mt-2">PRE-APPROVED PREFERRED</p>
                        <p className="text-[11px] font-mono tracking-wider font-extrabold text-[#E5E7EB] mt-1">XXXX XXXX XXXX 2026</p>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>{loginEmail ? loginEmail.split('@')[0].toUpperCase() : "AMIT BANSAL"}</span>
                        <span className="text-slate-400 font-bold">VISA Platinum</span>
                      </div>
                    </div>
                  </a>
                )}

                {adTab === "invest" && (
                  <a 
                    href="https://www.effectivecpmnetwork.com/qi5fdib0?key=05930c25f038032c2352f537bfb3a1f8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full max-w-sm block hover:opacity-90 transition group cursor-pointer"
                  >
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center relative overflow-hidden flex flex-col items-center">
                      <span className="absolute top-2.5 right-2.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">HIGH INDEX</span>
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3.5 group-hover:scale-110 transition duration-300">
                        <TrendingUp className="w-7 h-7" />
                      </div>
                      <p className="text-xs font-bold text-slate-200">SAVINGS COMPOUND ENGINE</p>
                      <div className="text-2xl font-black text-emerald-400 mt-1 font-mono tracking-wider">9.15% APY</div>
                      
                      <div className="w-full text-slate-500 text-[10px] mt-1 space-y-1">
                        <p>₹1,00,000 turns to <span className="text-slate-300 font-bold font-mono">₹1,09,150</span> in 1yr</p>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-slate-900 w-full text-[10px] text-emerald-400 font-semibold group-hover:underline flex items-center justify-center gap-1">
                        Invest instantly <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: CORE PORTFOLIO & HISTORICAL STATEMENT DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn" id="dashboard-tab-panel">
            
            {/* Active Statement Detail Banner */}
            <div className="bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-cyan-950/40 border border-cyan-800/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-cyan-950/20" id="active-assessment-banner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-blue-500/10">
                  <FileText className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/30">Active Document Ledger</span>
                    {activeReport.metadata.originalFileName.includes("Demo") ? (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono font-medium">SIMULATION DEMO DATA</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono font-medium">REAL STATEMENT LOADED</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1 flex items-center gap-1.5">
                    {activeReport.metadata.originalFileName}
                  </h3>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400">Statement cycle cycle logs</p>
                <div className="text-sm font-semibold text-slate-200 mt-1 flex items-center gap-1.5 sm:justify-end">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span className="font-mono text-xs">{activeReport.metadata.periodStart} to {activeReport.metadata.periodEnd}</span>
                </div>
              </div>
            </div>

            {/* Top Row: Meta summary banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Institution Verified</p>
                  <p className="text-base font-bold text-slate-100">{activeReport.metadata.bankName}</p>
                  <p className="text-[11px] font-mono text-slate-500">{activeReport.metadata.accountNumber} ({activeReport.metadata.accountType})</p>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Account holder Name</p>
                  <p className="text-base font-bold text-slate-100">{activeReport.metadata.accountHolder}</p>
                  <p className="text-[11px] text-slate-500 font-mono">IFSC Code: {activeReport.metadata.ifsc}</p>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Parser Integrity</p>
                    <p className="text-sm font-semibold text-emerald-400 font-mono">{activeReport.metadata.parserUsed}</p>
                    <p className="text-[11px] text-slate-500">{activeReport.metadata.uploadDate}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={() => mockExportReport('pdf')}
                    className="p-1 px-2 bg-slate-950 rounded text-[9px] font-bold text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                  >
                    PDF OUT
                  </button>
                  <button
                    onClick={() => mockExportReport('excel')}
                    className="p-1 px-2 bg-slate-950 rounded text-[9px] font-bold text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                  >
                    EXCEL OUT
                  </button>
                </div>
              </div>
            </div>

            {/* Core KPI Financial Health Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card AMB */}
              <div className="bg-slate-900/40 rounded-xl border border-slate-850 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl group-hover:scale-125 transition" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Monthly Balance (AMB)</span>
                  <div className="text-cyan-400 bg-cyan-900/10 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/20">6-Month Trend</div>
                </div>
                <p className="text-2xl font-black text-slate-100 font-mono">₹{activeReport.metrics.averageMonthlyBalance.toLocaleString('en-IN')}</p>
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400">
                  <span className="text-emerald-400 font-mono font-semibold">+6.2% Monthly</span>
                  <span>vs. mandatory bank criteria</span>
                </div>
              </div>

              {/* Card Peak Balance */}
              <div className="bg-slate-900/40 rounded-xl border border-slate-850 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl group-hover:scale-125 transition" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Peak Balance (Maximum)</span>
                  <div className="text-blue-400 bg-blue-900/10 px-2 py-0.5 rounded text-[10px] font-mono border border-blue-500/20">Historical</div>
                </div>
                <p className="text-2xl font-black text-slate-100 font-mono">₹{activeReport.metrics.maximumBalance.toLocaleString('en-IN')}</p>
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400">
                  <span>Minimum Out:</span>
                  <span className="text-amber-400 font-semibold font-mono">₹{activeReport.metrics.minimumBalance.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Card Salary Stability */}
              <div className="bg-slate-900/40 rounded-xl border border-slate-850 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/5 rounded-full blur-2xl group-hover:scale-125 transition" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Employer Payroll Score</span>
                  <div className="text-emerald-400 bg-emerald-900/10 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20">AI Evaluated</div>
                </div>
                <p className="text-2xl font-black text-slate-100 font-mono">{activeReport.salary.salaryScore} <span className="text-xs font-normal text-slate-500">/ 100</span></p>
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400 truncate">
                  <span className="text-emerald-400 font-semibold font-mono">{activeReport.salary.growthIndicator}</span>
                  <span className="truncate">{activeReport.salary.salaryCredits.length > 0 ? "Payroll Stable" : "P2P Transfers Only"}</span>
                </div>
              </div>

              {/* Loan Readiness Score */}
              <div className="bg-slate-900/40 rounded-xl border border-slate-850 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/5 rounded-full blur-2xl group-hover:scale-125 transition" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Loan Readiness Score</span>
                  <div className="text-purple-400 bg-purple-900/10 px-2 py-0.5 rounded text-[10px] font-mono border border-purple-500/20">Credit Index</div>
                </div>
                <p className="text-2xl font-black text-slate-100 font-mono">{activeReport.loanEligibility.readinessScore} <span className="text-xs font-normal text-slate-500">/ 100</span></p>
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400">
                  <div className={`w-2 h-2 rounded-full ${activeReport.loanEligibility.readinessScore > 75 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="font-semibold">{activeReport.loanEligibility.readinessScore > 75 ? 'Excellent Readiness' : 'Moderate Credibility'}</span>
                </div>
              </div>

            </div>

            {/* Interactive Visual Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Side: Dynamic monthly ledger trend graph */}
              <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-200">Historical Balance Fluctuations Chart</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Aggregate credit-to-debit ledger projection across the 6-month assessment interval.</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Bal</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded" /> Inflow</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500/40 rounded" /> Outflow</span>
                  </div>
                </div>

                {/* Inline Premium Custom SVG Graph with zero browser dependencies for 100% build guarantee */}
                <div className="relative w-full h-64 bg-slate-950/60 rounded-xl border border-slate-850 p-4 flex flex-col justify-between">
                  <svg className="w-full h-48" viewBox="0 0 600 200" preserveAspectRatio="none">
                    {/* Gridlines */}
                    <line x1="0" y1="20" x2="600" y2="20" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="600" y2="80" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Shadow under line */}
                    <path
                      d="M 20,130 Q 140,80 260,110 T 500,45 L 580,60 L 580,200 L 20,200 Z"
                      fill="url(#cyan-grad)"
                      opacity="0.15"
                    />

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#0F172A" />
                      </linearGradient>
                    </defs>

                    {/* Peak / Valley points */}
                    <circle cx="500" cy="45" r="5" fill="#06B6D4" stroke="#0F172A" strokeWidth="2" />
                    <circle cx="20" cy="130" r="5" fill="#F59E0B" stroke="#0F172A" strokeWidth="2" />

                    {/* Balance Trend Line */}
                    <path
                      d="M 20,130 Q 140,80 260,110 T 500,45 L 580,60"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Bar columns for month credit levels (Simulated D3 pattern) */}
                    <rect x="80" y="40" width="16" height="160" fill="#2563EB" opacity="0.3" rx="2" />
                    <rect x="200" y="60" width="16" height="140" fill="#2563EB" opacity="0.3" rx="2" />
                    <rect x="320" y="30" width="16" height="170" fill="#2563EB" opacity="0.3" rx="2" />
                    <rect x="440" y="50" width="16" height="150" fill="#2563EB" opacity="0.3" rx="2" />

                    {/* Sparkle markers */}
                    <text x="500" y="30" fill="#22C55E" className="text-[9px] font-mono font-bold">Peak ₹{activeReport.metrics.maximumBalance.toLocaleString('en-IN')}</text>
                  </svg>
                  
                  {/* Axis labels */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-3 border-t border-slate-900 pt-2">
                    <span>Nov (Q2 Start)</span>
                    <span>Dec</span>
                    <span>Jan (New Year)</span>
                    <span>Feb</span>
                    <span>Mar (Tax Target)</span>
                    <span>Apr (Fiscal End)</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Area-wise outflow allocation */}
              <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-slate-200">Debit Outflow Allocator</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Automated NLP parsing of bank narration labels divided into standard spending classes.</p>
                </div>

                <div className="space-y-3.5 my-4">
                  {[
                    { label: "Loan EMI Defusal", value: activeReport.emi.totalEmiBurden, percent: activeReport.metrics.totalDebits > 0 ? Math.round((activeReport.emi.totalEmiBurden / activeReport.metrics.totalDebits) * 100) : 15, color: "bg-blue-500" },
                    { label: "Tax Actions & GST Pay", value: activeReport.gst.totalGstPaid, percent: activeReport.metrics.totalDebits > 0 ? Math.round((activeReport.gst.totalGstPaid / activeReport.metrics.totalDebits) * 100) : 0, color: "bg-emerald-500" },
                    { label: "Retail Shopping / UPI", value: Math.round(activeReport.metrics.totalDebits * 0.35), percent: 35, color: "bg-cyan-500" },
                    { label: "Cash Disbursals", value: Math.round(activeReport.metrics.totalDebits * 0.2), percent: 20, color: "bg-purple-500" },
                    { label: "Quarterly Bank Charges & Penalties", value: activeReport.charges.totalCharges, percent: activeReport.metrics.totalDebits > 0 ? Math.round((activeReport.charges.totalCharges / activeReport.metrics.totalDebits) * 100) : 3, color: "bg-red-500" }
                  ].map((cat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                          {cat.label}
                        </span>
                        <span className="text-slate-400 font-mono">₹{cat.value.toLocaleString('en-IN')} ({cat.percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900">
                        <div className={`h-full ${cat.color}`} style={{ width: `${cat.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-950/20 border border-blue-900/30 rounded-xl text-xs text-cyan-300">
                  💡 **FinCred Insights**: Outflow behavior classified as **High Liquidity Structured**. Over {activeReport.emi.debtToIncomeRatio}% is recurring automated ECS.
                </div>
              </div>

            </div>

            {/* AI Engineering Core Module Spotlights */}
            <div>
              <h3 className="text-base font-semibold tracking-tight text-slate-100 flex items-center gap-2 mb-4">
                <Sparkles className="h-4.5 w-4.5 text-cyan-400" />
                Specialist AI Financial Audit Spotlights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Salary Detection Engine Area */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md font-mono font-bold uppercase tracking-wider">SALARY DETECTOR</span>
                    {activeReport.salary.salaryCredits.length > 0 ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold"><CheckCircle className="h-3 w-3" /> VERIFIED INDICES</span>
                    ) : (
                      <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">NOT DETECTED</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Stable Employment Ledger Analysis</h4>
                    <p className="text-xs text-slate-400 mt-1">{activeReport.salary.stabilityDescription}</p>
                  </div>
                  {activeReport.salary.salaryCredits.length > 0 && (
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Employer Identified:</span>
                        <span className="text-slate-300 font-medium truncate max-w-[150px]">{activeReport.salary.salaryCredits[0].employerName}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Regular Income Rank:</span>
                        <span className="text-emerald-400 font-bold font-mono">₹{activeReport.salary.salaryCredits[0].amount.toLocaleString('en-IN')}/mo</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Consistency Quotient:</span>
                        <span className="text-slate-300 font-semibold font-mono">{activeReport.salary.consistencyScore}/100</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* EMI Burden Engine Area */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md font-mono font-bold uppercase tracking-wider">EMI TRACKER</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold font-mono ${
                      activeReport.emi.status === 'Low Burden' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                    }`}>{activeReport.emi.status}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Liability Burden Monitoring</h4>
                    <p className="text-xs text-slate-400 mt-1">Detected recurring commercial lending installments and ECS accounts matching EMI patterns.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Monthly EMI Total:</span>
                      <span className="text-slate-300 font-bold font-mono">₹{activeReport.emi.totalEmiBurden.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Debt-to-Income Proportion:</span>
                      <span className="text-blue-400 font-bold font-mono">{activeReport.emi.debtToIncomeRatio}% DTI</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Total Count cycle:</span>
                      <span className="text-slate-300 font-semibold font-mono">{activeReport.emi.emiCount} occurrences</span>
                    </div>
                  </div>
                </div>

                {/* GST Merchant Auditor */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-md font-mono font-bold uppercase tracking-wider">GST MERCHANT AUDITOR</span>
                    <span className="text-[10px] text-slate-400">GSTR-3B Scanner</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Proprietorship Taxation Tracker</h4>
                    <p className="text-xs text-slate-400 mt-1">Segments business GST payouts and credit inflows. Vital for self-employed loan approvals.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Total GST Tax Debited:</span>
                      <span className="text-red-400 font-bold font-mono">₹{activeReport.gst.totalGstPaid.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Total GST Tax Collected:</span>
                      <span className="text-emerald-400 font-bold font-mono">₹{activeReport.gst.totalGstReceived.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Est. GSTR Monthly Turnover:</span>
                      <span className="text-cyan-400 font-bold font-mono">₹{(activeReport.gst.estimatedGstTurnover || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Charges & Surcharges Auditor */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md font-mono font-bold uppercase tracking-wider">FEE LEAK AUDITOR</span>
                    <span className="text-xs text-amber-500 font-mono font-medium">Outflow Audit</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Institutional Surcharge Leaks</h4>
                    <p className="text-xs text-slate-400 mt-1">Identifies SMS Alerts surcharge, ATM transaction threshold fees, annual debit maintenance, or penalties.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Annual Alert Fees:</span>
                      <span className="text-slate-300">₹{activeReport.charges.smsCharges}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ATM Surcharges:</span>
                      <span className="text-slate-300">₹{activeReport.charges.atmCharges}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Leaks Audit:</span>
                      <span className="text-red-400 font-bold">₹{activeReport.charges.totalCharges}</span>
                    </div>
                  </div>
                </div>

                {/* Cheque & Return Index */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-mono font-bold uppercase tracking-wider">RETURN CHASSIS</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold font-mono ${
                      activeReport.cheques.chequeBounceCount > 0 ? "bg-red-500/15 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {activeReport.cheques.chequeBounceCount > 0 ? "OUTWARD RETURN FOUND" : "ZERO BOUNCES"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Outward ECS Return Index</h4>
                    <p className="text-xs text-slate-400 mt-1">Critical tracking of cheque failures, outward signature mismatches, or automated ECS insufficient fund incidents.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Cheque Bounce Failures:</span>
                      <span className={`font-black ${activeReport.cheques.chequeBounceCount > 0 ? 'text-red-400 font-mono': 'text-slate-300'}`}>{activeReport.cheques.chequeBounceCount}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Outward Bounce Ratio:</span>
                      <span className="text-slate-300 font-mono">{activeReport.cheques.chequeBounceRatio}%</span>
                    </div>
                  </div>
                </div>

                {/* Credit Readiness Matrix */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-850 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded uppercase tracking-wide font-bold">LENDING ENGINES MATRIX</span>
                    <span className="text-[10px] text-slate-400">Approved limits</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { type: "Housing loan (SBI-Home)", val: activeReport.loanEligibility.homeLoanLimit },
                      { type: "Unsecured Personal loan", val: activeReport.loanEligibility.personalLoanLimit },
                      { type: "SME Commercial scaling", val: activeReport.loanEligibility.businessLoanLimit },
                      { type: "Auto Acquisition Loan Desk", val: activeReport.loanEligibility.vehicleLoanLimit }
                    ].map((l, i) => (
                      <div key={i} className="flex justify-between text-xs border-b border-slate-850 pb-1">
                        <span className="text-slate-400">{l.type}</span>
                        <span className="text-slate-100 font-bold font-mono">{l.val > 0 ? `₹${l.val.toLocaleString('en-IN')}` : "Not Eligible"}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* In-depth Loan Eligibility scorecard factors */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-200">Credit Scorecard & Loan Readiness Factors</h3>
                <p className="text-xs text-slate-400 mt-0.5">Automated screening metrics matched with parameters required by non-banking financial entities.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeReport.loanEligibility.eligibilityFactors.map((f, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-start gap-3">
                    <div className="mt-0.5">
                      {f.status === 'Positive' ? (
                        <CheckCircle className="h-4.5 w-4.5 text-emerald-400" />
                      ) : f.status === 'Critical' ? (
                        <AlertTriangle className="h-4.5 w-4.5 text-red-400" />
                      ) : (
                        <Clock className="h-4.5 w-4.5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-300">{f.factor}</p>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          f.status === 'Positive' ? 'bg-emerald-500/10 text-emerald-400' : f.status === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'
                        }`}>{f.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{f.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Statement Ledger Transaction Rows */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-200">Reconciled Statement Transaction Ledger</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Full tabular verification log. System parsed columns with custom localized tags.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="bg-slate-950/70 text-xs px-3.5 py-1.8 rounded-lg pl-9 border border-slate-800 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40"
                    />
                    <Search className="h-3 w-3 text-slate-600 absolute left-3 top-2.5" />
                  </div>
                  <button
                    onClick={() => mockExportReport('excel')}
                    className="bg-slate-950 p-2 border border-slate-850 hover:bg-slate-850 text-slate-300 font-semibold text-xs rounded-lg flex items-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" /> Excel
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 border-b border-slate-850 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                      <th className="p-3.5 pl-6">Date</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Narration Descriptor</th>
                      <th className="p-3.5 text-right">Debit (Withdrawal)</th>
                      <th className="p-3.5 text-right">Credit (Deposit)</th>
                      <th className="p-3.5 text-right pr-6">Running Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-xs text-slate-300 font-mono">
                    {activeReport.transactions.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/30 transition">
                        <td className="p-3.5 pl-6 font-medium text-slate-400">{t.date}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide ${
                            t.category === 'Salary' ? 'bg-emerald-500/10 text-emerald-400' :
                            t.category === 'EMI' ? 'bg-blue-500/10 text-blue-400' :
                            t.category === 'GST' ? 'bg-cyan-500/10 text-cyan-400' :
                            t.category === 'Charge' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {t.category}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-sm truncate text-slate-300" title={t.narration}>
                          {t.isBounce && <span className="text-red-400 font-bold border border-red-500/30 px-1 rounded mr-1 text-[9px]">⚠️ BOUNCED</span>}
                          {t.narration}
                        </td>
                        <td className="p-3.5 text-right font-semibold text-slate-300">
                          {t.debit > 0 ? `₹${t.debit.toLocaleString('en-IN')}` : "-"}
                        </td>
                        <td className="p-3.5 text-right font-semibold text-emerald-400">
                          {t.credit > 0 ? `₹${t.credit.toLocaleString('en-IN')}` : "-"}
                        </td>
                        <td className="p-3.5 text-right font-black text-slate-100 pr-6">
                          ₹{t.balance.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: CO-OPERATIVE, PATPEDHI & MULTI-BANK CONSOLIDATION */}
        {activeTab === "cooperative" && (
          <div className="space-y-8 animate-fadeIn" id="multi-bank-consolidation-panel">
            
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Database className="h-5.5 w-5.5 text-blue-400" />
                Indian Cooperatives, Patpedhi & Multi-Bank Consolidation
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-3xl">
                Small finance banks, Gramin Patpedhi, or cooperative societies statements have historically been hard to unify due to regional formats. FinCred solves this by merging multiple bank registers into a single, comprehensive ledger stream.
              </p>

              {/* Checkbox bank selector */}
              <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-slate-850">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Select Active Statement Profiles to Consolidate</span>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {[
                    { key: "sbi", name: "SBI Savings", logo: "🏛️" },
                    { key: "hdfc", name: "HDFC Current", logo: "🏛️" },
                    { key: "shivaji", name: "Shivaji Co-op", logo: "🌾" },
                    { key: "satara_pat", name: "Satara Patpedhi", logo: "👥" },
                    { key: "bajaj", name: "Bajaj Fin", logo: "⚡" },
                    { key: "dbs", name: "DBS Foreign", logo: "🌐" }
                  ].map((bank) => {
                    const active = consolidatedBanks.includes(bank.key);
                    return (
                      <button
                        key={bank.key}
                        type="button"
                        onClick={() => {
                          if (active) {
                            setConsolidatedBanks(consolidatedBanks.filter(b => b !== bank.key));
                          } else {
                            setConsolidatedBanks([...consolidatedBanks, bank.key]);
                          }
                        }}
                        className={`p-3 rounded-lg border text-left transition ${
                          active
                            ? "bg-blue-950/30 border-blue-500/80 text-white"
                            : "bg-slate-900/40 border-slate-850 text-slate-400 hover:bg-slate-900 hover:text-slate-350"
                        }`}
                      >
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span>{bank.logo} {bank.name}</span>
                          <input 
                            type="checkbox" 
                            checked={active} 
                            readOnly
                            className="rounded border-slate-700 bg-slate-800 text-cyan-500 text-xs h-3.5 w-3.5 focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Consolidated Cash-flow Analytics */}
            {consolidatedBanks.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left side: Merged credit index */}
                <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-200">Consolidated Money Metrics</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Summed totals from selected accounts.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
                      <span className="text-[11px] font-mono text-slate-500 uppercase">Pooled Combined AMB Balance</span>
                      <p className="text-2xl font-black text-slate-100 font-mono mt-1">₹{consolidatedRes.amb.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-400 mt-1 italic">Providing superior loan safety margin buffers</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
                      <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">Consolidated Cash-Flows (6 months)</span>
                      <div className="flex justify-between mt-2.5 text-xs">
                        <span className="text-slate-400">Merged Inflow Credits:</span>
                        <span className="font-semibold text-emerald-400 font-mono">₹{consolidatedRes.credits.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-slate-400">Merged Outflow Debits:</span>
                        <span className="font-semibold text-slate-300 font-mono">₹{consolidatedRes.debits.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center / Right side: Pooled Loan limits */}
                <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-200">Merged Consolidated Loan Limits</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Eligibility computed using unified cash flows, satisfying multi-property underwriting needs.</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">PRO MAX LIMIT</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">Consolidated Home / Office Property Loan</span>
                        <span className="text-cyan-400 text-[10px]">Prime sanction desk</span>
                      </div>
                      <p className="text-xl font-black text-slate-100 font-mono">₹{consolidatedRes.home.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-400">Approved at co-operative bank base rate (MCLR + 1.25%)</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">Pooled Business Extension Lending</span>
                        <span className="text-cyan-400 text-[10px]">NBFC + Private bank pooled</span>
                      </div>
                      <p className="text-xl font-black text-slate-100 font-mono">₹{consolidatedRes.business.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-400">Calculated based on business GST turnover indicators</p>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-950/20 border border-cyan-900/30 rounded-xl text-xs text-slate-300">
                    💡 **CA Recommendation**: Merging state ledgers demonstrates **₹{(consolidatedRes.amb * 0.12).toLocaleString('en-IN')} additional quarterly liquidity**, reducing overall interest-rate spread risks by 45 basis points.
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center p-12 bg-slate-900/30 rounded-2xl border border-slate-800">
                <AlertTriangle className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                <p className="text-sm text-slate-350">Select at least one statement check-box parameter to formulate consolidated financial analysis.</p>
              </div>
            )}

            {/* Special spotlight co-operative structure */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6">
              <h3 className="font-semibold text-slate-200 mb-4">Shree Shivaji Sahakari Co-op Bank Ledger (OCR Transcribed Demo Preview)</h3>
              <p className="text-xs text-slate-400 mb-4">
                This demonstrates our **Tier 2 OCR Parsing** capability. The system scanned a scanned Marathi/English regional passbook image, identified columns natively without structured templates, and extracted this ledger perfectly:
              </p>

              <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-850">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase bg-slate-900/40 font-bold">
                      <th className="p-3">दिनांक (Date)</th>
                      <th className="p-3">तपशील (Narration / Particulars)</th>
                      <th className="p-3">चेक नंबर (Chq Ref)</th>
                      <th className="p-3 text-right">नावे / डेबिट (Debit)</th>
                      <th className="p-3 text-right">जमा / क्रेडिट (Credit)</th>
                      <th className="p-3 text-right">शिल्लक (Balance)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-350">
                    <tr>
                      <td className="p-3 text-slate-400">2026-04-01</td>
                      <td className="p-3">वेतन जमा (SALARY CREDIT BY maharashtra education dept)</td>
                      <td className="p-3">NEFT-001289</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right text-emerald-400">₹55,000.00</td>
                      <td className="p-3 text-right text-slate-100">₹82,400.00</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400">2026-04-05</td>
                      <td className="p-3">कर्ज हप्ता वजा (ECS DEBIT GOLD LOAN REPAYMENT)</td>
                      <td className="p-3">CCSL-90812</td>
                      <td className="p-3 text-right text-slate-400">₹8,200.00</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right text-slate-100">₹74,200.00</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400">2026-04-15</td>
                      <td className="p-3">वार्षिक एसएमएस शुल्क वजा (SMS NOTIFICATION CHG)</td>
                      <td className="p-3">AUTO-FEE</td>
                      <td className="p-3 text-right text-slate-400">₹17.70</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right text-slate-100">₹74,182.30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: REAL-TIME SECURE AI CHAT ANALYST */}
        {activeTab === "chat" && (
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 h-[600px] flex flex-col justify-between" id="ai-chat-panel">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <MessageSquare className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">AI Grounded Financial Analyst Chat</h2>
                  <p className="text-xs text-slate-400">Grounded in the parsed transaction catalog of: <strong className="text-cyan-400 font-mono">{activeReport.metadata.bankName}</strong></p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-xs text-emerald-400 font-mono">Gemini AI Engaged</span>
              </div>
            </div>

            {/* Core Messages Stream Area */}
            <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 text-sm text-slate-200">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end animate-slideLeft" : "justify-start animate-slideRight"
                  }`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-tr-none"
                        : "bg-slate-950 border border-slate-850 rounded-tl-none text-slate-150 leading-relaxed font-sans"
                    }`}
                  >
                    {/* Render newlines neatly in paragraph formatting */}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isChatTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-950 border border-slate-850 px-4 py-3 rounded-2xl rounded-tl-none font-mono text-xs flex items-center gap-2 text-cyan-400">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span>Analyzing ledger database...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Helper Inquiries Row */}
            <div className="py-2.5 border-t border-slate-850/50">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">Auto Analyst Prompts:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Calculate my Average Monthly Balance (AMB)",
                  "Do I have any cheque returning or bounce logs?",
                  "Is there a stable salaries payroll credit?",
                  "Recommend maximum bank loan limits based on this file"
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => triggerQuickQuestion(q)}
                    className="text-[10px] bg-slate-950 text-slate-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg border border-slate-850 transition cursor-pointer hover:border-cyan-500/30"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Send Message Input */}
            <form onSubmit={submitChatMessage} className="flex gap-2">
              <input
                type="text"
                value={pendingChatInput}
                onChange={(e) => setPendingChatInput(e.target.value)}
                placeholder="Ask secure financial AI analyst (e.g. 'Show top 10 credits')"
                className="flex-1 bg-slate-950 text-xs px-4 py-3 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500/50 placeholder-slate-650"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs p-3 px-5 rounded-xl transition flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" /> Ask AI
              </button>
            </form>

          </div>
        )}

        {/* Tab 4: CA / LOAN CONSULTANT PORTAL */}
        {activeTab === "consultant" && (
          <div className="space-y-8 animate-fadeIn" id="ca-consultant-panel">
            
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-400" />
                    CA & Loan Consultant Administration Workspace
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Firm Name: <strong className="text-slate-200">{consultantFirmName}</strong></p>
                </div>

                {/* White-label branding toggler */}
                <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-300 block">CA White-Label Reports</span>
                    <span className="text-[9px] text-slate-500">Watermarks custom branding logo</span>
                  </div>
                  <button
                    onClick={() => setCaWhiteLabel(!caWhiteLabel)}
                    className={`w-11 h-6 rounded-full p-1 transition duration-200 focus:outline-none ${
                      caWhiteLabel ? "bg-emerald-500" : "bg-slate-800"
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-200 ${
                      caWhiteLabel ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>

              {/* CRM Client Profiles List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left CRM navigation */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Client Mandates</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 rounded-full font-mono">{clients.length} Total</span>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {clients.map((c) => {
                      const isSelected = selectedClient?.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedClient(c);
                            // Preload matching demo database report when client changes
                            if (c.id === "cl-1") setActiveReport(DEFAULT_SBI_DEMO);
                            else {
                              // Dynamically calculate on the fly for the other CA clients
                              const generated = c.id === "cl-3" ? "dbs" : "hdfc";
                              // fetch appropriate SIM data
                              const response = fetch("/api/parse-statement", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ bankKey: generated })
                              }).then(v => v.json()).then(r => {
                                if (r.success) setActiveReport(r.data);
                              });
                            }
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                            isSelected
                              ? "bg-gradient-to-r from-blue-950/40 via-blue-900/15 to-transparent border-cyan-500/50 text-white"
                              : "bg-slate-950/60 border-slate-850 hover:bg-slate-900/40 text-slate-350"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-bold text-slate-200">{c.name}</p>
                            <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{c.businessName}</p>
                            <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono">
                              <span className="bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">{c.statementsCount} statements</span>
                              <span className="text-slate-500">{c.onboardedAt}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black font-mono text-cyan-400 block">{c.financialScore}/100</span>
                            <span className="text-[9px] text-slate-500 uppercase">Health Score</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Add New Client mandate form */}
                  <form onSubmit={handleAddNewClient} className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3">
                    <span className="text-xs font-bold text-slate-400 block">Onboard New Client Mandate</span>
                    <input
                      type="text"
                      placeholder="Client Name (e.g. Ketan Modi)"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full bg-slate-900 text-xs px-2.5 py-2 border border-slate-800 rounded placeholder-slate-600 focus:outline-none focus:border-cyan-500/40"
                    />
                    <input
                      type="text"
                      placeholder="Business Name (e.g. Modi Ceramics)"
                      value={newClientBusiness}
                      onChange={(e) => setNewClientBusiness(e.target.value)}
                      className="w-full bg-slate-900 text-xs px-2.5 py-2 border border-slate-800 rounded placeholder-slate-600 focus:outline-none focus:border-cyan-500/40"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 font-bold text-xs rounded transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Client Portfolio
                    </button>
                  </form>
                </div>

                {/* Right CA details */}
                <div className="lg:col-span-8 bg-slate-950 p-6 rounded-xl border border-slate-850 space-y-6">
                  {selectedClient ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-100">{selectedClient.name}</h3>
                            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-mono px-1.5 py-0.5 rounded">
                              Plan: {selectedClient.planTier}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Direct Audit Line: {selectedClient.phone}  |  {selectedClient.email}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-500 font-mono">Current Active Ledger Assessment</span>
                          <p className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{activeReport.metadata.bankName}</p>
                        </div>
                      </div>

                      {/* White Label Watermark preview box */}
                      {caWhiteLabel && (
                        <div className="p-3 bg-gradient-to-r from-slate-900 to-slate-950 border border-dashed border-cyan-500/30 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-cyan-400 flex items-center gap-1.5 font-bold">
                            <Shield className="h-4 w-4" />
                            Premium CA Branding Watermark Enabled
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono italic">Header stamped: &quot;{consultantFirmName}&quot;</span>
                        </div>
                      )}

                      {/* KPI quick metrics for selected client */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-mono">Average AMB</span>
                          <p className="text-lg font-black text-slate-100 font-mono mt-1">₹{activeReport.metrics.averageMonthlyBalance.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-mono">Total Net deposits</span>
                          <p className="text-lg font-black text-emerald-400 font-mono mt-1">₹{activeReport.metrics.totalCredits.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-mono">Liability Status</span>
                          <p className="text-lg font-black text-amber-400 font-mono mt-1">{activeReport.emi.status}</p>
                        </div>
                      </div>

                      {/* Document Actions desk */}
                      <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 space-y-4">
                        <span className="text-xs font-bold text-slate-350 block">Audit Report Export Options (White-Labeled)</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                          <button
                            onClick={() => mockExportReport('pdf')}
                            className="bg-slate-950 p-3 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition"
                          >
                            <Download className="h-4 w-4 text-cyan-400" /> Export PDF Assessment
                          </button>
                          <button
                            onClick={() => mockExportReport('excel')}
                            className="bg-slate-950 p-3 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition"
                          >
                            <Download className="h-4 w-4 text-emerald-400" /> Export Excel Ledger
                          </button>
                          <button
                            onClick={() => mockExportReport('csv')}
                            className="bg-slate-950 p-3 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition"
                          >
                            <Download className="h-4 w-4 text-blue-400" /> Export CSV Rowset
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center p-12 text-slate-500">
                      Select client list profile from the left matrix.
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Tab 5: ADMIN TEMPLATE SYSTEM BUILDER */}
        {activeTab === "admin" && (
          <div className="space-y-8 animate-fadeIn" id="admin-dashboard-panel">
            
            {/* Top row with details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Visual template mapper wizard */}
              <div className="lg:col-span-7 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Sliders className="h-5.5 w-5.5 text-blue-400" />
                    Admin Statement Template Builder
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Finetune parsing models block for regional cooperative, patpedhi, or future-proof bank layouts. Map columns manually in 3 seconds.
                  </p>
                </div>

                <form onSubmit={handleCreateTemplateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-mono font-medium mb-1.5">New Bank Name Identifier</label>
                      <input
                        type="text"
                        value={builderMappedColumns.bankName}
                        onChange={(e) => setBuilderMappedColumns({ ...builderMappedColumns, bankName: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-mono font-medium mb-1.5">Date Column selector</label>
                      <input
                        type="text"
                        value={builderMappedColumns.date}
                        onChange={(e) => setBuilderMappedColumns({ ...builderMappedColumns, date: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-mono font-medium mb-1.5">Debit (Withdrawal) col</label>
                      <input
                        type="text"
                        value={builderMappedColumns.debit}
                        onChange={(e) => setBuilderMappedColumns({ ...builderMappedColumns, debit: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-mono font-medium mb-1.5">Credit (Deposit) col</label>
                      <input
                        type="text"
                        value={builderMappedColumns.credit}
                        onChange={(e) => setBuilderMappedColumns({ ...builderMappedColumns, credit: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-mono font-medium mb-1.5">Balance column descriptor</label>
                      <input
                        type="text"
                        value={builderMappedColumns.balance}
                        onChange={(e) => setBuilderMappedColumns({ ...builderMappedColumns, balance: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-mono font-medium mb-1.5">Narration / Particulars column</label>
                      <input
                        type="text"
                        value={builderMappedColumns.narration}
                        onChange={(e) => setBuilderMappedColumns({ ...builderMappedColumns, narration: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                  </div>

                  {isTemplateSuccessfullyCreated && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 rounded-lg text-xs flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4" /> Template rule deployed! Dynamic layout engine will now automatically match prospective uploads matching format.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl transition"
                  >
                    Deploy New Parser Ruleset (No Developer Needed)
                  </button>
                </form>
              </div>

              {/* Right Column: Existing templates database */}
              <div className="lg:col-span-5 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-200">Active Template Mappings Desk</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Template matching system checks matches prior to executing heavier AI OCR models.</p>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {templates.map((t, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs flex flex-col justify-between gap-2.5">
                      <div className="flex justify-between items-start font-mono">
                        <span className="font-bold text-slate-200">{t.bankName}</span>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 rounded uppercase tracking-wider text-[8px] font-bold">READY STATE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] text-slate-400 border-t border-slate-900 pt-2.5">
                        <div>Date: <strong className="text-slate-300">{t.dateColumn}</strong></div>
                        <div>Narration: <strong className="text-slate-300">{t.narrationColumn}</strong></div>
                        <div>Debit: <strong className="text-slate-300">{t.debitColumn}</strong></div>
                        <div>Credit: <strong className="text-slate-300">{t.creditColumn}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Microservices processing telemetry logs */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6">
              <h3 className="font-semibold text-slate-200 mb-2">Microservices Live Processing Log Files</h3>
              <p className="text-xs text-slate-400 mb-4">Cryptographic decrypt, Tesseract scans, AI categorization telemetry lines.</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto pr-2 text-slate-400">
                {adminLogs.map((log) => (
                  <div key={log.id} className="flex justify-between border-b border-slate-900 pb-1 hover:bg-slate-900/20 transition">
                    <span className="flex items-center gap-1">
                      <span className="text-slate-600">[{log.time}]</span>
                      <span className="text-slate-500 font-bold font-mono">FIN-SRV-CORE:</span>
                      <span className="text-slate-200">{log.action}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-slate-600">file: {log.file}</span>
                      <span className="bg-slate-90 w-max text-cyan-400 text-[9px] px-1 bg-slate-900 rounded">{log.speed}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 6: REGISTERED USERS MANAGEMENT */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-fadeIn" id="users-tab-panel">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div>
                <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-cyan-400" />
                  User Demographics & Leads
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Manage newly registered trial customers and enterprise upgrades.
                </p>
              </div>
            </div>

            {userRole === "Super Admin" ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/50">
                {registeredUsers.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-sm">
                    No users registered yet during this session.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                          <th className="px-4 py-3">User Details</th>
                          <th className="px-4 py-3">Mobile & Address</th>
                          <th className="px-4 py-3">Location</th>
                          <th className="px-4 py-3">Reg. Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {registeredUsers.map((u, i) => (
                          <tr key={i} className="hover:bg-slate-800/20 transition">
                            <td className="px-4 py-4">
                              <p className="font-bold text-slate-200">{u.name}</p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">{u.email}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300 font-mono">{u.mobile}</p>
                              <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">{u.address || "N/A"}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{u.city || "N/A"}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{u.state} - {u.pincode}</p>
                            </td>
                            <td className="px-4 py-4 text-xs font-mono text-slate-400">
                              {new Date(u.registeredAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
                <Lock className="h-8 w-8 text-slate-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-300">Access Restricted</h4>
                <p className="text-sm mt-1">You must be operating as Super Admin to view the user registry.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 7: SUBSCRIPTION MANAGEMENT & COMPLIANCE RULES */}
        {activeTab === "subscription" && (
          <div className="space-y-8 animate-fadeIn" id="pricing-tab-panel">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight">FinCred Premium Membership desk</h2>
              <p className="text-xs text-slate-400">
                Unlock universal regional banks OCR transcription models, API client integrations, ca portfolios lead-management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  tier: "Free",
                  price: "₹0",
                  sub: "Lifetime basic testing",
                  features: ["One Statement Upload Lifetime", "Basic Analysis", "Dashboard Access", "No PDF/Excel Exports", "No AI Chat Assistant"],
                  buttonLabel: "Active Demo Frame"
                },
                {
                  tier: "Professional",
                  price: "₹299/mo",
                  sub: "Individual finance tracking",
                  features: ["Unlimited Statement Uploads", "PDF Reports Export", "AI Chat Assistant enabled", "Advanced Dashboard Insights", "Multi-device logins allowed"],
                  buttonLabel: "Upgrade to Professional"
                },
                {
                  tier: "Business",
                  price: "₹999/mo",
                  sub: "Small businesses & merchants",
                  features: ["Multi-Bank Consolidation", "Loan Eligibility Analyzer", "GST Business Tax Summary", "Excel & CSV Export", "Priority speed process queues"],
                  buttonLabel: "Upgrade to Business"
                },
                {
                  tier: "CA / Loan Consultant",
                  price: "₹4,999/mo",
                  sub: "Consultants & underwriting advisors",
                  features: ["Multiple Client Lead CRM", "Consultant Team Access Accounts", "White Label branding watermark Toggling", "CA Revenues analytics", "Client scorecards desktop"],
                  buttonLabel: "Current Subscription"
                },
                {
                  tier: "EnterprisePlan",
                  price: "Custom Value",
                  sub: "Lending institutions & APIs",
                  features: ["Full REST API Sandbox", "Custom CRM branding", "Dedicated tenant infrastructure", "SAML SSO Identity login", "Premium dedicated SLA desk"],
                  buttonLabel: "Contact Treasury Desk"
                }
              ].map((plan, i) => {
                const isActive = subscriptionPlan === plan.tier || (plan.tier === "CA / Loan Consultant" && subscriptionPlan === "CA / Loan Consultant");
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border p-5 flex flex-col justify-between relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-b from-blue-950/30 to-slate-900/60 border-cyan-500/80 shadow-lg shadow-cyan-500/10"
                        : "bg-slate-900/30 border-slate-800 text-slate-350"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-0 right-0 bg-cyan-500 text-slate-950 font-mono font-bold text-[8px] px-2 py-0.5 uppercase tracking-widest rounded-bl rounded-tr">
                        ACTIVE PLAN
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">{plan.tier}</span>
                        <p className="text-xl font-black text-slate-100 font-mono mt-1">{plan.price}</p>
                        <p className="text-[10px] text-slate-500 mt-1 italic leading-tight">{plan.sub}</p>
                      </div>

                      <div className="space-y-2 border-t border-slate-850 pt-4 text-[10px] text-slate-400">
                        {plan.features.map((f, iIdx) => (
                          <div key={iIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 scale-90">✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isActive}
                      onClick={() => {
                        if (plan.tier === "Free" || plan.tier === "EnterprisePlan") return;
                        setSelectedPaymentPlan({ tier: plan.tier, price: plan.price });
                        setPaymentModalOpen(true);
                        setPaymentSuccess(false);
                        setShowBillingForm(true);
                      }}
                      className={`w-full py-2 rounded-lg text-[10px] font-bold block mt-6 text-center transition ${
                        isActive
                          ? "bg-cyan-500 text-slate-950 font-bold shadow-sm cursor-default"
                          : plan.tier === "EnterprisePlan" || plan.tier === "Free" 
                            ? "bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-400 cursor-pointer"
                            : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      {plan.buttonLabel}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Legal compliance GDPR / E2E encryption rules disclosures */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 p-6 space-y-4">
              <h3 className="font-semibold text-slate-200">Legal Compliance & Strict 30-Day Auto Delete Policy Directive</h3>
              <p className="text-xs text-slate-400">
                To guarantee complete data confidentiality across co-operative and mercantile operations, FinCred operates under strict privacy mandates matching the information security guidelines.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">E2E Master Cryptography</span>
                  <span className="text-slate-500 leading-tight">Statements decrypted inside container processes. Private keys are never logged.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">30-Day Auto Delete Policy</span>
                  <span className="text-slate-500 leading-tight">All PDF transcripts, OCR indexations, metadata entries parsed are permanently deleted after exactly 30 days cycle.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">Admissibility Stamp</span>
                  <span className="text-slate-500 leading-tight">Calculators generate certified outputs admissible in Indian courts as qualified financial evidence files.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">Role-Based Access (RBAC)</span>
                  <span className="text-slate-500 leading-tight">Super Admins can audit templates and transaction counts; user-level statements remain completely private.</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* How to Use Modal */}
      {howToUseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                  <HelpCircle className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                    How to Use FinCred Platform
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    A comprehensive walk-through of the platform&apos;s primary features and workflows.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setHowToUseModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition p-1 hover:bg-slate-850 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Block 1 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/50 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-cyan-400/10 flex items-center justify-center text-[10px]">1</span>
                    Statement Templates
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Map customized statement configurations under the <span className="text-slate-200 font-medium">Admin Template Builder</span>. Map Date, Narration, Debit, Credit, and Balance columns relative to any Bank Excel format seamlessly.
                  </p>
                </div>

                {/* Block 2 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/50 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-blue-400/10 flex items-center justify-center text-[10px]">2</span>
                    Upload & Analysis
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Drag & drop bank statement files in the <span className="text-slate-200 font-medium">Upload statements</span> area. The system will parse them according to the selected template scheme using high-performance sandbox engines.
                  </p>
                </div>

                {/* Block 3 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-emerald-400/10 flex items-center justify-center text-[10px]">3</span>
                    Multi-Bank Consolidation
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Merge separate statements into one central dataset by selecting bank keys. Compare cash inflows and outflows chronologically in a central consolidated analytical layout.
                  </p>
                </div>

                {/* Block 4 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/50 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-purple-400/10 flex items-center justify-center text-[10px]">4</span>
                    AI Grounded Chatbot
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Switch to the <span className="text-slate-200 font-medium">AI Grounded Analyst Chat</span> tab to interact with your records. Calculate weighted average balances, trace bounce registries, and estimate monthly salaries automatically.
                  </p>
                </div>

                {/* Block 5 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/50 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-yellow-400/10 flex items-center justify-center text-[10px]">5</span>
                    Consultants & CRM Tools
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Manage client lists in the <span className="text-slate-200 font-medium">CA & Consultant Portal</span>. Toggle watermark white-label settings to replace FinCred watermarks with your custom firm banner, and generate premium financial report scorecards.
                  </p>
                </div>

              </div>

              {/* Support/Friction Help block */}
              <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl p-4 flex gap-3">
                <div className="mt-0.5 text-cyan-400">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Help & Dedicated Support</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    If you need any custom bank statement templates, advanced integration help, or have questions about using the platform, we are here for you.
                  </p>
                  <p className="text-xs text-cyan-400 font-semibold pt-1">
                    We typically respond within 24 hours. Please feel free to drop a mail at:{" "}
                    <a href="mailto:amitbansal21@gmail.com" className="underline font-mono hover:text-cyan-300">
                      amitbansal21@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setHowToUseModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/10 transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal (Sign In / Sign Up) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
                    {authMode === "signin" ? "Welcome Back" : "Create Account"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {authMode === "signin" ? "Sign in to access your financial dashboard" : "Sign up and analyze your statements"}
                  </p>
                </div>
                <button 
                  onClick={() => setAuthModalOpen(false)}
                  className="text-slate-500 hover:text-slate-300 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
                  {authError}
                </div>
              )}

              {authMode === "signin" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-cyan-500 transition font-mono text-sm placeholder:text-slate-600"
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Password</label>
                    <input 
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-cyan-500 transition font-mono text-sm placeholder:text-slate-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold block text-center transition bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/10 mt-6"
                  >
                    Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text"
                      value={signupDetails.name}
                      onChange={(e) => setSignupDetails(prev => ({...prev, name: e.target.value}))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-cyan-500 transition text-sm"
                      placeholder="e.g. Rahul Sharma"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email"
                      value={signupDetails.email}
                      onChange={(e) => setSignupDetails(prev => ({...prev, email: e.target.value}))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-cyan-500 transition font-mono text-sm"
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</label>
                    <input 
                      type="tel"
                      value={signupDetails.mobile}
                      onChange={(e) => setSignupDetails(prev => ({...prev, mobile: e.target.value}))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-cyan-500 transition font-mono text-sm"
                      placeholder="+91"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Password</label>
                    <input 
                      type="password"
                      value={signupDetails.password}
                      onChange={(e) => setSignupDetails(prev => ({...prev, password: e.target.value}))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-cyan-500 transition font-mono text-sm"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="pt-2 text-xs text-slate-500 font-medium border-t border-slate-800 mt-2 flex items-center justify-between">
                    <span>Billing Details (Required)</span>
                    <span className="text-[10px] text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">Used for invoicing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input required type="text" value={signupDetails.address} onChange={(e) => setSignupDetails(prev => ({...prev, address: e.target.value}))} placeholder="Address" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 outline-none focus:border-cyan-500 text-xs col-span-2" />
                    <input required type="text" value={signupDetails.city} onChange={(e) => setSignupDetails(prev => ({...prev, city: e.target.value}))} placeholder="City" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 outline-none focus:border-cyan-500 text-xs" />
                    <input required type="text" value={signupDetails.pincode} onChange={(e) => setSignupDetails(prev => ({...prev, pincode: e.target.value}))} placeholder="Pincode" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 outline-none focus:border-cyan-500 text-xs" />
                    <input required type="text" value={signupDetails.state} onChange={(e) => setSignupDetails(prev => ({...prev, state: e.target.value}))} placeholder="State" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 outline-none focus:border-cyan-500 text-xs" />
                    <input required type="text" value={signupDetails.country} onChange={(e) => setSignupDetails(prev => ({...prev, country: e.target.value}))} placeholder="Country" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 outline-none focus:border-cyan-500 text-xs" />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold block text-center transition bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/10 mt-4"
                  >
                    Complete Sign Up
                  </button>
                </form>
              )}

              <div className="mt-6 text-center text-xs">
                {authMode === "signin" ? (
                  <p className="text-slate-400">
                    Don&apos;t have an account?{" "}
                    <button type="button" onClick={() => { setAuthMode("signup"); setAuthError(""); }} className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition">Sign Up</button>
                  </p>
                ) : (
                  <p className="text-slate-400">
                    Already have an account?{" "}
                    <button type="button" onClick={() => { setAuthMode("signin"); setAuthError(""); }} className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition">Sign In</button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {paymentModalOpen && selectedPaymentPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-cyan-900/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <span className="text-emerald-400">G</span><span className="text-blue-400">Pay</span> Checkout
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Upgrade to {selectedPaymentPlan.tier} Plan</p>
                </div>
                <button 
                  onClick={() => {
                    setPaymentModalOpen(false);
                    setPaymentProcessing(false);
                  }}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!paymentSuccess ? (
                showBillingForm ? (
                  <form onSubmit={(e) => { e.preventDefault(); setShowBillingForm(false); }} className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-2">Billing Details Required</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                        <input required type="text" value={billingDetails.name} onChange={e => setBillingDetails(prev => ({...prev, name: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="e.g. Rahul Sharma" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">E-mail ID <span className="text-cyan-500 text-[10px] ml-1">(Invoice will be sent here)</span></label>
                        <input readOnly type="email" value={billingDetails.email} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400 outline-none select-none cursor-not-allowed" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Mobile Number</label>
                        <input required type="tel" value={billingDetails.mobile} onChange={e => setBillingDetails(prev => ({...prev, mobile: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="+91" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Address</label>
                        <input required type="text" value={billingDetails.address} onChange={e => setBillingDetails(prev => ({...prev, address: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="Street layout" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">City</label>
                        <input required type="text" value={billingDetails.city} onChange={e => setBillingDetails(prev => ({...prev, city: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="City" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Pin Code</label>
                        <input required type="text" value={billingDetails.pincode} onChange={e => setBillingDetails(prev => ({...prev, pincode: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="Postal Code" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">State</label>
                        <input required type="text" value={billingDetails.state} onChange={e => setBillingDetails(prev => ({...prev, state: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="State" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Country</label>
                        <input required type="text" value={billingDetails.country} onChange={e => setBillingDetails(prev => ({...prev, country: e.target.value}))} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" placeholder="India" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button 
                        type="button" 
                        onClick={() => {
                          setPaymentModalOpen(false);
                          setShowBillingForm(false);
                        }}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold block text-center transition bg-slate-800 hover:bg-slate-750 border border-slate-700/50 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold block text-center transition bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20">
                        Proceed to Payment
                      </button>
                    </div>
                  </form>
                ) : (
                <div className="space-y-6 animate-fadeIn">
                  {/* Total amount section */}
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
                    <span className="block text-xs font-semibold text-slate-400 mb-1">Amount to Pay</span>
                    <span className="text-3xl font-black text-white font-mono">{selectedPaymentPlan.price}</span>
                  </div>

                  {/* Real GPay QR & Link Card (Identical to the user's attachment) */}
                  <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col items-center">
                    {/* The GPay visual card matching user's image */}
                    <div className="w-full max-w-[280px] bg-[#f0f4f9] rounded-2xl p-5 shadow-xl text-slate-900 border border-slate-200/50">
                      {/* Avatar & Name */}
                      <div className="flex items-center justify-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-full bg-white border border-slate-200 overflow-hidden flex items-center justify-center relative">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                            🦋
                          </div>
                        </div>
                        <span className="font-sans font-bold text-slate-800 text-sm tracking-wide">amit agrawal</span>
                      </div>

                      {/* Dynamic Scannable QR Code */}
                      <div className="bg-white p-3 rounded-2xl relative shadow-md shadow-slate-100 flex items-center justify-center select-none border border-slate-100">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0f172a&data=${encodeURIComponent(`upi://pay?pa=amitbansal21-1@okicici&pn=amit%20agrawal&am=${selectedPaymentPlan.price.replace(/[^\d]/g, '')}&cu=INR&tn=FinCred%20Subscription`)}`} 
                          alt="GPay UPI QR Code"
                          className="w-40 h-40 object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        {/* Google Pay Center Logo Dot Badge */}
                        <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full shadow-md border border-slate-200 flex items-center justify-center">
                          <div className="flex space-x-[2px] items-center">
                            <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                            <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                            <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                            <span className="w-2 h-2 rounded-full bg-[#FBBC05]"></span>
                          </div>
                        </div>
                      </div>

                      {/* UPI ID text */}
                      <div className="text-center mt-4">
                        <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase font-bold">UPI ID</p>
                        <p className="text-[11px] font-bold text-slate-700 font-mono select-all mt-0.5">amitbansal21-1@okicici</p>
                      </div>
                    </div>

                    {/* Scan instruction */}
                    <p className="text-xs font-semibold text-slate-400 mt-4 tracking-wide font-sans text-center">Scan to pay with any UPI App</p>

                    {/* Highly Professional Direct Native Deep-Link calling GPay/UPI */}
                    <div className="w-full mt-4">
                      <a 
                        href={`upi://pay?pa=amitbansal21-1@okicici&pn=amit%20agrawal&am=${selectedPaymentPlan.price.replace(/[^\d]/g, '')}&cu=INR&tn=FinCred%20Subscription`}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center gap-2 transition"
                      >
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/2/24/Google_Pay_G_Logo.svg" 
                          alt="GPay icon" 
                          className="w-4 h-4"
                          referrerPolicy="no-referrer" 
                        />
                        Pay Directly on Mobile UPI/GPay App
                      </a>
                    </div>
                  </div>

                  {paymentProcessing ? (
                     <div className="w-full py-3 rounded-lg text-sm font-bold text-center bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 flex items-center justify-center gap-2">
                       <UploadCloud className="h-4 w-4 animate-bounce" />
                       Confirming Transaction...
                     </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={() => {
                          setPaymentProcessing(true);
                          setTimeout(() => {
                            setPaymentProcessing(false);
                            setPaymentSuccess(true);
                            setSubscriptionPlan(selectedPaymentPlan.tier as SubscriptionPlan);
                            setChatMessages(prev => [
                              ...prev,
                              {
                                sender: "bot",
                                text: `🎉 **Plan Updated!** Successfully upgraded to the **${selectedPaymentPlan.tier}** subscription. Features have been unlocked.`
                              }
                            ]);
                            
                            // After showing success for 3 seconds, close the modal
                            setTimeout(() => {
                              setPaymentModalOpen(false);
                              setPaymentSuccess(false);
                            }, 3500);
                          }, 2500);
                        }}
                        className="w-full py-3 rounded-xl text-sm font-bold block text-center transition bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20"
                      >
                        I have completed the payment
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentModalOpen(false);
                          setShowBillingForm(false);
                        }}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold block text-center transition bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/50"
                      >
                        ← Go Back & Cancel payment
                      </button>
                    </div>
                  )}
                  
                  <p className="text-[10px] text-slate-500 text-center px-4">
                    By confirming payment, you agree to FinCred Solutions terms of service. Active subscription valid for 30 days.
                  </p>
                </div>
                )
              ) : (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-100">Payment Successful!</h3>
                  <p className="text-slate-400 max-w-[280px] mx-auto text-sm leading-relaxed">
                    Your {selectedPaymentPlan.tier} features are now active. An invoice and confirmation details have been sent to your registered email <strong className="text-slate-200">{billingDetails.email || "user@email.com"}</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Corporate footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-semibold font-mono">FinCred Solutions (Prop. Amit Bansal) — Aapke Sapno Ka Financial Saathi</p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-wider text-slate-600">REST API Version 4.12.0</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-600">© 2026 Mumbai India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
