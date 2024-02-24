import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageDefaultTitle } from "@/client/hooks/use-page-title";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: PageDefaultTitle,
  description: "Alura App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`text-gray-70 dark:text-white bg-white dark:bg-gray-900 ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
