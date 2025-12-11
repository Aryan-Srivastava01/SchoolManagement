import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "School Management",
  description: "A school management system",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {/* Global Toaster */}
        <Toaster position="top-right" />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
