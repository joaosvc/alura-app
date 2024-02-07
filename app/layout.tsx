import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageDefaultTitle } from "@/client/hooks/use-page-title";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: PageDefaultTitle,
  description: "Alura App - Courses Packages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
