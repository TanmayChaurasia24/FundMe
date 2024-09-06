"use client";
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import DotPattern from "../../components/magicui/dot-pattern";
import React from 'react';
import { SignupFormDemo } from '@/components/Login';

export function DotPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Dot Pattern
      </p>
      <DotPattern
        className={cn(
          "absolute inset-0 z-0 w-full h-full [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}

const login = () => {
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-[100vh] scroll-hide">
      <div className="h-full w-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        {/* <Boxes/> */}
        <div className="relative z-20 ">
          <SignupFormDemo />
        </div>
      </div>
    </div>
  );
};

export default login;
