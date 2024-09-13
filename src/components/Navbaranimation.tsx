"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const { data: session }: any = useSession();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"} className="text-white font-semibold">
          Home
        </Link>
        {!session ? (
          <>
            <Link href={"/signup"} className="text-white font-semibold">
              Signup
            </Link>
            <Link href={"/login"} className="text-white font-semibold">
              Login
            </Link>
          </>
        ) : (
          <>
            {session?.user && (
              <MenuItem
                setActive={setActive}
                active={active}
                // Use curly braces with backticks for template literals
                item={`Welcome ${session.user.name} ↓`}
              >
                <div className="flex flex-col justify-center gap-3">
                  <Link href={`/${session.user.name}`} className="text-white font-semibold">
                    My Page
                  </Link>
                  <Link
                    href={"/dashboard"}
                    className="text-white font-semibold"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={"/"}
                    onClick={() => signOut()}
                    className="text-white font-semibold"
                  >
                    Logout
                  </Link>
                </div>
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
