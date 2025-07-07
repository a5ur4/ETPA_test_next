import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { VehicleProvider } from "@/contexts/VehicleContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "EPTA Tecnologia",
  description: "Sistema de autenticação EPTA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <AuthProvider>
          <SidebarProvider>
            <VehicleProvider>
              {children}
            </VehicleProvider>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
