/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  date: string;
  narration: string;
  debit: number;
  credit: number;
  balance: number;
  refNumber?: string;
  category: 'Salary' | 'EMI' | 'GST' | 'Charge' | 'Cheque' | 'Transfer' | 'Rent' | 'Cash' | 'Shopping' | 'Utilities' | 'Investment' | 'Others';
  isBounce?: boolean;
  tag?: string;
}

export interface StatementMetadata {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  accountType: string;
  ifsc: string;
  branch: string;
  originalFileName: string;
  uploadDate: string;
  periodStart: string;
  periodEnd: string;
  parserUsed: 'Tier 1 (Native Parser)' | 'Tier 2 (Universal AI OCR Parser)';
  passwordProtected: boolean;
}

export interface AdvancedFinancialMetrics {
  averageMonthlyBalance: number;
  quarterlyBalance: number;
  annualBalance: number;
  minimumBalance: number;
  maximumBalance: number;
  peakBalance: number;
  dailyAverageBalance: number;
  totalCredits: number;
  totalDebits: number;
  creditCount: number;
  debitCount: number;
}

export interface SalaryAnalysis {
  salaryCredits: Array<{
    date: string;
    narration: string;
    amount: number;
    employerName: string;
  }>;
  consistencyScore: number; // 0-100
  stabilityDescription: string;
  growthIndicator: string; // e.g. "+12.5% YoY"
  salaryScore: number; // 0-100
}

export interface EmiAnalysis {
  emiCredits: Array<{
    date: string;
    narration: string;
    amount: number;
    loanType: string;
  }>;
  totalEmiBurden: number;
  emiCount: number;
  debtToIncomeRatio: number; // percentage
  status: 'Low Burden' | 'Moderate Burden' | 'High Burden' | 'Critical Burden';
}

export interface GstAnalysis {
  gstTransactions: Array<{
    date: string;
    narration: string;
    amount: number;
    type: 'IGST' | 'CGST' | 'SGST' | 'GST-PAY';
    partyName: string;
  }>;
  totalGstPaid: number;
  totalGstReceived: number;
  estimatedGstTurnover: number;
}

export interface BankChargesAnalysis {
  charges: Array<{
    date: string;
    narration: string;
    amount: number;
    chargeType: 'ATM Charges' | 'SMS Charges' | 'Service Charges' | 'Penalty Charges' | 'Annual Maintenance' | 'Others';
  }>;
  totalCharges: number;
  atmCharges: number;
  serviceCharges: number;
  smsCharges: number;
  penaltyCharges: number;
}

export interface ChequeAnalysis {
  chequeTransactions: Array<{
    date: string;
    narration: string;
    amount: number;
    chequeNumber: string;
    type: 'Cheque Deposit' | 'Cheque Bounce' | 'Cheque Clearance';
    isBounce: boolean;
  }>;
  totalChequeDeposits: number;
  chequeBounceCount: number;
  chequeBounceRatio: number; // percentage
  clearanceSpeedDays: number;
}

export interface LoanEligibility {
  readinessScore: number; // 0-100
  personalLoanLimit: number;
  homeLoanLimit: number;
  vehicleLoanLimit: number;
  businessLoanLimit: number;
  eligibilityFactors: Array<{
    factor: string;
    status: 'Positive' | 'Neutral' | 'Critical';
    message: string;
  }>;
}

export interface ConsolidatedAnalysisResult {
  metadata: StatementMetadata;
  metrics: AdvancedFinancialMetrics;
  salary: SalaryAnalysis;
  emi: EmiAnalysis;
  gst: GstAnalysis;
  charges: BankChargesAnalysis;
  cheques: ChequeAnalysis;
  loanEligibility: LoanEligibility;
  transactions: Transaction[];
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  statementsCount: number;
  financialScore: number;
  planTier: string;
  onboardedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  role: string;
  action: string;
  details: string;
  status: 'success' | 'failed' | 'warning';
}

export interface StatementTemplate {
  id: string;
  bankName: string;
  dateColumn: string;
  debitColumn: string;
  creditColumn: string;
  balanceColumn: string;
  narrationColumn: string;
  refColumn: string;
  createdBy: string;
  createdAt: string;
  active: boolean;
}

export type SubscriptionPlan = 'Free' | 'Professional' | 'Business' | 'CA / Loan Consultant' | 'Enterprise';
