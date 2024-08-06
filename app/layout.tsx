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
                  Developed by <a className={"hover:underline"} href={"https://github.com/salvobonsma"}
                                  target={"_blank"}>Salvo Bonsma</a> for the <a className={"hover:underline"}
                                                                                href={"https://ai.google.dev/competition"}
                                                                                target={"_blank"}>2024 Gemini API
                  Developer Competition</a>. Code on <a className={"hover:underline"}
                                                        href={"https://github.com/salvobonsma/explore-with-gemini"}
                                                        target={"_blank"}>GitHub</a>.
              </p>
          </footer>
          </body>
          </html>
    );
}
