"use client";
import { Boxes } from "../../components/ui/background-boxes";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormDemo } from "@/components/Signup";

const Signup = () => {
    const [loading, setLoading] = useState(false);
  
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-[100vh] scroll-hide">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="h-full w-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="relative z-20">
            <SignupFormDemo/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
