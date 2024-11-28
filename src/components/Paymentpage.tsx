"use client";

import Image from "next/image";
import { ThreeDCardDemo } from "../components/FansBgCard";
import { PlaceholdersAndVanishInputDemo } from "../components/Makepayment";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // Ensure Firebase is initialized here

export default function UsernamePage({ username }: any) {
  const [user, setUser] = useState<any>(null); // State to track logged-in user
  const auth = getAuth(app); // Firebase Auth instance
  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() => {
    // Set up Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Store authenticated user data
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("🦄 Payment done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    // Redirect to user's personalized page if displayName is available
    if (user?.displayName) {
      router.push(`/${user.displayName}`);
    }
  }, [user, searchParams, router]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="min-h-screen bg-gray-900 text-white">
        <div className="relative">
          <Image
            src="/download.jpg"
            alt="Cover image"
            width={1920}
            height={350}
            className="w-full h-[350px] object-cover"
          />
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
            <Avatar className="h-28 w-28 border-4 border-white">
              <AvatarImage src="/download.jpg" alt={`@${username}'s avatar`} />
              <AvatarFallback>{username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 space-y-2">
          <h1 className="text-2xl font-bold">@{username || "Guest"}</h1>
          <p className="text-gray-400">Creating animated art for VTT</p>
          <p className="text-gray-400">
            343,234 posts · $3,452/release · 2,342 members
          </p>
        </div>

        <div className="payments flex gap-5 w-[70%] mx-auto mb-2">
          <ThreeDCardDemo />
          <div className="flex flex-col h-[40vh] justify-center items-center mt-[150px]">
            <PlaceholdersAndVanishInputDemo />
          </div>
        </div>
      </div>
    </>
  );
}
