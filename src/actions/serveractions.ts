"use server";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { dbconnect } from "@/db/db";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export const handleSignup = async (formdata: FormData) => {

  const username = formdata.get("username") as string | undefined;
  const email = formdata.get("email") as string | undefined;
  const password = formdata.get("password") as string | undefined;

  if (!username || !email || !password) {
    toast("🦄 Enter all credentials", {
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
    return;
  }

  try {
    await dbconnect();
    const exist_user = await User.findOne({ email });

    if (exist_user) {
      toast("🦄 User already exists!", {
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
      return;
    }

    const hashedpass = await bcrypt.hash(password, 20);
    const newUser = new User({ username, email, hashedpass });
    await newUser.save();

    toast("🦄 User created successfully!", {
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

    redirect('/login')
  } catch (error) {
    // Handle any errors
    console.error("Error during user creation:", error);
    toast("🦄 Something went wrong!", {
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
};

export const handleLogin = async (formdata: FormData) => {
    
    const email = formdata.get("email") as string | undefined;
    const password = formdata.get("password") as string | undefined;

    if (!email || !password) {
      toast("🦄 Enter all credentials", {
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
      return;
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      // Handle any errors
      console.error("Error during user creation:", error);
      toast("🦄 Something went wrong!", {
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
}