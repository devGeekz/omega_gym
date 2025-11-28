import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <Card className="w-full max-w-110 mx-auto flex flex-col gap-6 min-h-100">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don`&apos;`t have an account?{" "}
            <Link
              href={"/register"}
              className="text-foreground decoration-0 no-underline font-normal hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
