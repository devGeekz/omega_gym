"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signUpSchema, SignUpSchemaType } from "@/lib/zod";
import FormError from "../FormError";

type ErrorState = Partial<Record<keyof SignUpSchemaType, string>>;

export default function SignUpForm() {
  const [form, setForm] = useState<SignUpSchemaType>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [generalError, setGeneralError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ----------------------- HANDLE INPUT CHANGE ----------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ----------------------- FORM SUBMIT ---------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    setIsLoading(true);

    const validation = signUpSchema.safeParse(form);

    if (!validation.success) {
      const newErrors: ErrorState = {};
      validation.error.issues.forEach((err) => {
        const field = err.path[0] as keyof SignUpSchemaType;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) {
        const { error }: { error: string } = await res.json();
        setGeneralError(error);
      } else {
        console.log("User created!");
      }
    } catch {
      setGeneralError("Network error. Please try again.");
    }

    setIsLoading(false);
  };

  /* ----------------------------- JSX ------------------------------ */

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {generalError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            <FormError text={generalError} />
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            name="fullname"
            value={form.fullname}
            placeholder="John Doe"
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormError text={errors.fullname} />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            placeholder="john@example.com"
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormError text={errors.email} />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              placeholder="Enter your password"
              onChange={handleChange}
              disabled={isLoading}
            />

            <button
              type="button"
              className="absolute right-3 top-3.5 hover:cursor-pointer"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
          <FormError text={errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            placeholder="Re-enter your password"
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormError text={errors.confirmPassword} />
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating Account...
          </div>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
}
