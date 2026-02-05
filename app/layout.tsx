import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Fuente Inter - moderna, limpia y versátil
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nati y Tito venden sus cosas :D",
  description: "Catálogo de productos de Nati y Tito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
