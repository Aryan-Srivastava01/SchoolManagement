import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "School Management",
  description: "A school management system",
};

export default function RootLayout({ children }) {
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
