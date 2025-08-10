// @ts-nocheck

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/ui/footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", plusJakarta.className)}>

       
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
         <Breadcrumbs />
         <Footer />
      </body>
    </html>
  );
}