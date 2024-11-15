import React from "react";
import { SignupFormDemo } from "@/components/Paymentform";
const page = ({ params }: any) => {
  return (
    <div className="bg-slate-900 h-[90vh] text-neutral-200 flex justify-center items-center overflow-hidden">
      <div className="">
        <SignupFormDemo></SignupFormDemo>
      </div>
    </div>
  );
};

export default page;
