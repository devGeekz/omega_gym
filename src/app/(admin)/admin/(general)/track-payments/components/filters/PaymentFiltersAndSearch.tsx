/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import {
  PaymentFilters,
  PaymentStatus,
  PaymentMethod,
} from "../../types/paymentTypes";

interface PaymentFiltersProps {
  onFilterChange: (filters: PaymentFilters) => void;
  isLoading: boolean;
}

export function PaymentFiltersAndSearch({
  onFilterChange,
  isLoading,
}: PaymentFiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PaymentStatus | "all">("all");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "all">(
    "all"
  );
  const [page, setPage] = useState(1);

  const handleFilterChange = () => {
    onFilterChange({
      search,
      status,
      paymentMethod,
      page,
      pageSize: 10,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
    setPaymentMethod("all");
    setPage(1);
    onFilterChange({
      search: "",
      status: "all",
      paymentMethod: "all",
      page: 1,
      pageSize: 10,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleFilterChange}
              disabled={isLoading}
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Search
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={status}
                onValueChange={(val: any) => setStatus(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Payment Method
              </label>
              <Select
                value={paymentMethod}
                onValueChange={(val: any) => setPaymentMethod(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                  <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
