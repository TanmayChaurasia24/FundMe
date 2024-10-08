import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "../components/Session-Wrapper";
import { NavbarDemo } from "../components/Navbaranimation";
import { getSession } from "next-auth/react"; // Adjust import as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(); // Fetch session data here

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper session={session}>
          <NavbarDemo />
          <div className="flex flex-col min-h-screen bg-slate-950">
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
