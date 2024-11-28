"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase"; // Ensure Firebase is initialized
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<any>(null); // State to track logged-in user
  const auth = getAuth(app); // Firebase Auth instance
  const router = useRouter();

  useEffect(() => {
    // Set up Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Store authenticated user data
      if (!currentUser) {
        // Redirect to login if not authenticated and not already on the login page
        router.push("/login");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
      router.push("/login"); // Redirect to login
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center justify-center" href="/">
          <span className="ml-2 text-xl font-bold text-blue-400">Fundme</span>
        </Link>
        <nav className="ml-auto justify-center items-center flex gap-4 sm:gap-6">
          {!user ? (
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
                onClick={handleLogout}
              >
                Logout
              </button>
              <Link
                className="text-sm font-medium hover:text-blue-400 transition-colors"
                href={`/${user.displayName || "profile"}`}
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
