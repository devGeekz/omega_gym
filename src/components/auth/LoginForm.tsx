"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import FormError from "../FormError";
import { signInSchema, SignInSchemaType } from "@/lib/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

type ErrorState = Partial<Record<keyof SignInSchemaType, string>>;

export default function LoginForm() {
  const [form, setForm] = useState<SignInSchemaType>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ----------------------------- INPUT CHANGE -------------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, rememberMe: checked }));
  };

  /* ----------------------------- SUBMIT --------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    setIsLoading(true);

    const validation = signInSchema.safeParse(form);

    if (!validation.success) {
      const newErrors: ErrorState = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignInSchemaType;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) {
        const { error }: { error: string } = await res.json();
        setGeneralError(error);
      } else {
        redirect("/dashboard");
      }
    } catch {
      setGeneralError("Network error. Please try again.");
    }

    setIsLoading(false);
  };

  /* ------------------------------- JSX --------------------------------------- */

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {generalError && (
          <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
            <FormError text={generalError} />
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormError text={errors.email} />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* Password Eye Toggle */}
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <FormError text={errors.password} />
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={form.rememberMe}
            onCheckedChange={(checked) =>
              handleCheckboxChange(checked === true)
            }
          />
          <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
            Remember me
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
