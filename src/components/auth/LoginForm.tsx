"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

interface SignInFormData {
  name?: string;
  email: string;
  password: string;
  rememberMe: boolean;
  confirmPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  rememberMe?: string;
  general?: string;
  name?: string;
  confirmPassword?: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<Partial<SignInFormData>>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (isSignUp && !formData.name?.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password?.trim()) {
      newErrors.password = "Password is required";
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof Partial<SignInFormData>,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // 🔹 Simulate a fake request
    setTimeout(() => {
      console.log(isSignUp ? "Signing up with:" : "Signing in with:", formData);

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      alert("Signed in successfully (demo only)");

      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-110 mx-auto flex flex-col gap-6 min-h-100">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription>
          {isSignUp ? "Enter your details to get started" : "Sign in to your account to continue"}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <CardContent className="flex flex-col gap-4">
          {errors.general && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword || ""}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  checked={!!formData.rememberMe}
                  onCheckedChange={(checked) =>
                    handleInputChange("rememberMe", checked === true)
                  }
                />
                <Label htmlFor="rememberMe" className="ml-2 text-sm cursor-pointer">
                  Remember me
                </Label>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (isSignUp ? "Creating Account..." : "Signing In...") : (isSignUp ? "Sign Up" : "Sign In")}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-foreground decoration-0 no-underline font-normal hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;


   {/* Remember me */}
        // <div className="flex items-center">
        //   <Checkbox
        //     id="rememberMe"
        //     checked={form.rememberMe}
        //     onCheckedChange={(checked) =>
        //       handleCheckboxChange(checked === true)
        //     }
        //   />
        //   <Label htmlFor="rememberMe" className="ml-2 text-sm cursor-pointer">
        //     Remember me
        //   </Label>
        // </div>

  //         const handleCheckboxChange = (checked: boolean) => {
  //   setForm((prev) => ({ ...prev, rememberMe: checked }));
  // };