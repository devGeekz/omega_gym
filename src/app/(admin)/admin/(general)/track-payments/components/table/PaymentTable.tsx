"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Trash2, Image } from "lucide-react";
import { Payment, PaymentActionData } from "../../types/paymentTypes";
import { formatDate } from "@/lib/utils";

interface PaymentTableProps {
  payments: Payment[];
  isLoading: boolean;
  onAction: (actionData: PaymentActionData) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  denied: "bg-red-100 text-red-800",
  rejected: "bg-orange-100 text-orange-800",
};

const methodLabels: Record<string, string> = {
  credit_card: "Credit Card",
  bank_transfer: "Bank Transfer",
  digital_wallet: "Digital Wallet",
  cryptocurrency: "Crypto",
};

export function PaymentTable({
  payments,
  isLoading,
  onAction,
  currentPage,
  pageSize,
  onPageChange,
}: PaymentTableProps) {
  if (isLoading) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Claim Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No payments found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">User Info</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Method</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Claim Date</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{payment.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.userEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {payment.id}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-green-600">
                    ${payment.amount.toFixed(2)}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {payment.description}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {methodLabels[payment.paymentMethod]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[payment.status]}>
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(payment.claimDate)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          onAction({
                            action: "view",
                            payment,
                          })
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onAction({
                            action: "view_proof",
                            payment,
                          })
                        }
                      >
                        <Image className="h-4 w-4 mr-2" />
                        View Proof
                      </DropdownMenuItem>
                      {payment.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              onAction({
                                action: "approve",
                                payment,
                              })
                            }
                            className="text-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onAction({
                                action: "deny",
                                payment,
                              })
                            }
                            className="text-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Deny Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onAction({
                                action: "reject",
                                payment,
                              })
                            }
                            className="text-orange-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Reject as Invalid
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaymentTablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={payments.length}
        onPageChange={onPageChange}
      />
    </div>
  );
}

interface PaymentTablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

function PaymentTablePagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: PaymentTablePaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
