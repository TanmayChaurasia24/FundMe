"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup,GithubAuthProvider } from "firebase/auth";

const auth = getAuth(app);

export function SignupFormDemo() {

  const google = new GoogleAuthProvider();
  const github = new GithubAuthProvider();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  
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

  const signupUser = async () => {
    try {
      if (!firstname || !lastname || !email || !password) {
        setError("All fields are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstname} ${lastname}`,
      });

      setSuccess("User signed up successfully!");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setError("");

      router.push(`/${user.displayName}`)

    } catch (error: any) {
      setError(error.message || "An error occurred during signup.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupUser();
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-300">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Signup to Fundme
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm text-center mt-2">{success}</p>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="firstname" className="text-black">
            First name
          </Label>
          <Input
            id="firstname"
            placeholder="Tyler"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="lastname" className="text-black">
            Last name
          </Label>
          <Input
            id="lastname"
            placeholder="Durden"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </LabelInputContainer>

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
          <Label htmlFor="password" className="text-black">
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
          Sign up &rarr;
        </button>
      </form>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <button
          onClick={signiniwithgithub}
          className="flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
          type="button"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Sign in with GitHub
          </span>
        </button>
        <button
          onClick={signinwithgoogle}
          className="flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
          type="button"
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
