import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Secure authentication for enterprise workspace",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
