"use client";

import { toast as sonnerToast } from "sonner";

interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  const toast = (props: ToastProps) => {
    const { title, description, variant = "default" } = props;
    
    if (variant === "destructive") {
      sonnerToast.error(description || title);
    } else {
      sonnerToast.success(description || title);
    }
  };

  return { toast };
}
