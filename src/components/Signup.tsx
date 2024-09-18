"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import axios from "axios"; // Added axios import
import toast from "react-hot-toast";

import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export function SignupFormDemo() {

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
      setUser({
        username: "",
        email: "",
        password: "",
      });
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // Calls signup API with user data
      console.log("Signup successful:", response);
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    setButtonDisable(!(email && password && username)); // Button is disabled if any field is empty
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(); // Calls handleSignup when form is submitted
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value })); // Updates the corresponding field in the user state
  };

  return (
    <div className="max-w-md m-auto w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to FundMe
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="username">UserName</Label>
            <Input
              id="username"
              placeholder="Tyler"
              type="text"
              value={user.username} // Controlled input
              onChange={handleChange} // Handle changes
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={user.email} // Controlled input
            onChange={handleChange} // Handle changes
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={user.password} // Controlled input
            onChange={handleChange} // Handle changes
          />
        </LabelInputContainer>

        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
            buttonDisable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={buttonDisable}
        >
          {loading ? "Signing up..." : "Sign up"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            // Changed to button (not submitting the form)
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" // Changed to button (not submitting the form)
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
