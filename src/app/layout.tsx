import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/Session-Wrapper";
import  Navbar from "../components/Navbar";
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
          <div className="overflow-hidden">
            <div className="h-[10vh]">
              <Navbar />
            </div>
            <div className="flex flex-col max-h-min bg-slate-950">
              {children}
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
