"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by reading from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
  }, []);

  const handleLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout response:", response);

      if (response.status === 200) {
        // Remove token and update state
        localStorage.removeItem("token");
        Cookies.remove("token"); // Ensure to remove cookies as well
        setIsLoggedIn(false); // Update state to reflect logout
        window.location.href = "/"; // Redirect to home
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"} className="text-white font-semibold">
          Home
        </Link>
        (
        <>
          <Link href={"/signup"} className="text-white font-semibold">
            Signup
          </Link>
          <Link href={"/login"} className="text-white font-semibold">
            Login
          </Link>

          <Link
            href={"/"}
            onClick={handleLogout}
            className="text-white font-semibold"
          >
            Logout
          </Link>
        </>
        )
        <MenuItem setActive={setActive} active={active} item="More">
        <div className="flex flex-col justify-center gap-3">
        <Link
            href={"/"}
            onClick={handleLogout}
            className="text-white font-semibold"
          >
            myPage
          </Link>
          <Link
            href={"/dashboard"}
            onClick={handleLogout}
            className="text-white font-semibold"
          >
            Dashboard
          </Link>
        </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
