"use client";
import { Boxes } from "../../components/ui/background-boxes";
import toast, { Toast } from "react-hot-toast";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { SignupFormDemo } from '@/components/Signup';
import Email from "next-auth/providers/email";
import { useRouter } from "next/navigation";

const signup = () => {
    const router = useRouter();

    const [user,setuser] = useState({
        username:"",
        email:"",
        password:"",
    });

    const [buttonDisable,setButtonDisable] = useState(false);
    const [loading,setloading] = useState(false);

    const onsignup = async() => {
        try {
            setloading(true);
            const response = await axios.post("/api/users/signup",user);
    
            console.log("signup successfully done",response);
            
            router.push("/login")
        } catch (error:any) {
            console.log("signup failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    },[user])

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
