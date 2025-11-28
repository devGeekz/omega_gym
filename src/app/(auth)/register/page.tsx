import SignUpForm from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <Card className="w-full max-w-110 mx-auto flex flex-col gap-6 min-h-100">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Enter your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <Link
              href={"/login"}
              className="text-foreground decoration-0 no-underline font-normal hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
