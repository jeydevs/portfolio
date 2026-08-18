import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/sidebar";
import { Menu } from "@/components/mobilemenu";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/chat/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeferson Olvera - Full Stack Developer",
  description: "Resume and portfolio of Jeferson Olvera, a full stack developer specializing in web development with React, Next.js, and TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col md:flex-row lg:flex-row pb-24 md:pb-0">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Menu />
          <SideBar />
          {children}
          {/* <ChatWidget /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
