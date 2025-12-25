export type PaymentStatus = "pending" | "confirmed" | "denied" | "rejected";
export type PaymentMethod =
  | "credit_card"
  | "bank_transfer"
  | "digital_wallet"
  | "cryptocurrency";
export type ProofType =
  | "screenshot"
  | "bank_statement"
  | "receipt"
  | "transaction_hash";

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  proofUrl: string;
  proofType: ProofType;
  claimDate: string;
  description: string;
  transactionRef: string;
  notes: string;
  confirmedDate: string | null;
  deniedDate: string | null;
  rejectedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  search: string;
  status: PaymentStatus | "all";
  paymentMethod: PaymentMethod | "all";
  page: number;
  pageSize: number;
}

export interface PaymentActionData {
  action:
    | "view"
    | "approve"
    | "deny"
    | "reject"
    | "view_proof"
    | null;
  payment: Payment | null;
}
