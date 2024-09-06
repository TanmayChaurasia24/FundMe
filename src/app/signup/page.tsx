"use client";
import { Boxes } from "../../components/ui/background-boxes";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormDemo } from "@/components/Signup";

const Signup = () => {
    const router = useRouter();

    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const [buttonDisable, setButtonDisable] = useState(true); // Initially disabled
    const [loading, setLoading] = useState(false);
  
    const handleSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup successful:", response);
        router.push("/login");
      } catch (error: any) {
        console.error("Signup failed:", error);
        toast.error(error.response?.data?.message || "An error occurred during signup");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const { email, password, username } = user;
      setButtonDisable(!(email && password && username)); // Button is disabled if any field is empty
    }, [user]);
  
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-[100vh] scroll-hide">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="h-full w-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          {/* <Boxes /> */}
          <div className="relative z-20">
            <SignupFormDemo/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
