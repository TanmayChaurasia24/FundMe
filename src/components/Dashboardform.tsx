"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="w-[95vw] md:w-[60vw] h-[80vh] overflow-auto mx-auto rounded-md p-4 md:p-8 bg-white dark:bg-black my-5 ">
      <form className="my-3 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="firstname">Name</Label>
          <Input id="firstname" placeholder="Tyler" type="text" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="lastname">Email</Label>
          <Input id="lastname" placeholder="durden@example.com" type="email" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="TylerDurden" type="text" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="profile-picture">Profile Picture</Label>
          <Input id="profile-picture" placeholder="Upload URL" type="text" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="cover-picture">Cover Picture</Label>
          <Input id="cover-picture" placeholder="Upload URL" type="text" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="razorpay-credentials">Razorpay id</Label>
          <Input id="razorpay-id" placeholder="Credentials" type="text" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="razorpay-credentials">Razorpay Secret</Label>
          <Input id="razorpay-secret" placeholder="Credentials" type="text" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black to-gray-700 block w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Save &rarr;
          <BottomGradient />
        </button>
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
