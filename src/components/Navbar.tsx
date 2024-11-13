"use client"

import { MountainIcon } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

const Navbar = () => {
  const { data: session }: { data: Session | null } = useSession();

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6 text-blue-400" />
          <span className="ml-2 text-xl font-bold text-blue-400">Fundme</span>
        </Link>
        <nav className="ml-auto justify-center items-center flex gap-4 sm:gap-6">
          {!session ? (
            <>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/signup"
              >
                Signup
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/dashboard"
              >
                Start a Project
              </Link>
            </>
          ) : (
            <>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/d/donate"
              >
                Donate
              </Link>
              <button
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                onClick={() => signOut()}
              >
                Logout
              </button>

              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href={`/${session.user?.name}`}
              >
                My Page
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href="/u/new"
              >
                Start a Project
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
