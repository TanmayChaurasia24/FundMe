"use client";
import { Boxes } from "../../components/ui/background-boxes";
import { Toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from 'react';
import { SignupFormDemo } from '@/components/Signup';
import Email from "next-auth/providers/email";

const signup = () => {
    const [user,setuser] = useState({
        username:"",
        email:"",
        password:"",
    });

    const [buttonDisable,setButtonDisable] = useState(false);
    const [loading,setloading] = useState(false);

  return (
      <div className="flex justify-center items-center overflow-y-hidden h-[100vh] scroll-hide">
      <div className=" h-full w-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <Boxes/>
        <div className=" relative z-20 ">
        <SignupFormDemo />
        </div>
      </div>
    </div>
  );
};

export default signup;
