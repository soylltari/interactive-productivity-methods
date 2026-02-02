import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "./components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Interactive Productivity Methods",
  description:
    "An interactive website where users take a short test to find the productivity method that suits them best, and then practice it through interactive tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
