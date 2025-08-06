import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from '@/contexts/SessionContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leadership Simulation MVP",
  description: "Practice crucial leadership conversations with AI-powered feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
