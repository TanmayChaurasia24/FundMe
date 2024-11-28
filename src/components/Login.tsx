"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup,GithubAuthProvider } from "firebase/auth";

const auth = getAuth(app);

export function SignupFormDemo() {
  const google = new GoogleAuthProvider();
  const github = new GithubAuthProvider();

  const router = useRouter();
  const [user, setUser] = useState<any>(null); // Firebase authenticated user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signinwithgoogle = () => {
    signInWithPopup(auth, google)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        router.push(`/${user.displayName}`)
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signiniwithgithub = () => {
    signInWithPopup(auth,github)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      GithubAuthProvider.credentialFromResult(result);
      const user = result.user;
      router.push(`/${user.displayName}`)
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Track Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const loginuser = async () => {
    // Validation checks
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const value = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", value);
      setError(""); // Clear error
      setSuccess("Login successful!");
      router.push(`/${value.user.displayName || "defaultUsername"}`); // Redirect using displayName
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to log in. Please try again."); // Set error message
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginuser();
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-300">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Login to Fundme
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm text-center mt-2">{success}</p>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="email" className="text-black">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password" className="text-black mt-3">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium mt-4"
          type="submit"
        >
          Login &rarr;
        </button>
      </form>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <button
          className="flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
          type="button"
          onClick={signiniwithgithub}
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Sign in with GitHub
          </span>
        </button>
        <button
          className="flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
          type="button"
          onClick={signinwithgoogle}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}

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
