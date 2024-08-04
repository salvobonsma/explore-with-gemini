import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Explore with Gemini",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
          <html lang="en">
          <body
                className={cn(
                      "min-h-screen bg-background font-sans antialiased",
                      inter.className
                )}
          >
          <main className={"container"}>
              {children}
          </main>
          <footer className={"border-t"}>
              <p className={"muted container my-6"}>
                  Developed for the 2024 Gemini API Developer Competition by Salvo Bonsma.
              </p>
          </footer>
          </body>
          </html>
    );
}
