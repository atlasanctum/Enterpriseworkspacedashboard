import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your enterprise workspace account",
};

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto size-16 rounded-lg bg-primary flex items-center justify-center mb-4">
          <span className="text-3xl">🌐</span>
        </div>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Login to access your enterprise workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
