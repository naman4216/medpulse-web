import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "HealthCare Pro | Modern Practice Management for Doctors",
  description: "The all-in-one platform to streamline appointments, manage patient records, and conduct secure tele-consultations. Focus on patients, not paperwork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-poppins antialiased",
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}