import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Enterprise Workspace',
    default: 'Enterprise Workspace - Unlimited Scale',
  },
  description: 'Govern with insight. Respond with precision. Scale without limits. Managing 12.4M beneficiaries across 23 countries.',
  keywords: ['humanitarian', 'enterprise', 'workspace', 'UN', 'beneficiary management', 'fraud detection'],
  authors: [{ name: 'Enterprise Workspace Team' }],
  creator: 'Enterprise Workspace',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://enterprise-workspace.com',
    title: 'Enterprise Workspace - Unlimited Scale',
    description: 'Govern with insight. Respond with precision. Scale without limits.',
    siteName: 'Enterprise Workspace',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Enterprise Workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Workspace - Unlimited Scale',
    description: 'Govern with insight. Respond with precision. Scale without limits.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://enterprise-workspace.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
