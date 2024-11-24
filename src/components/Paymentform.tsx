"use client";
import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { initiate } from "../actions/Useractions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface RazorpayOptions {
  key_id: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  callback_url: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

interface TypePaymentForm {
  name: string;
  message: string;
  amount: number | string;
}

export function SignupFormDemo() {
  const { data: session }: { data: Session | null } = useSession();
  const [paymentform, setPaymentForm] = useState<TypePaymentForm>({
    name: "",
    message: "",
    amount: 0,
  });

  // Step 1: State to track if Razorpay SDK has loaded
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Step 2: Load Razorpay script when component mounts
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setIsRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay SDK");
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount: number) => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay SDK not loaded yet.");
      return;
    }

    if (!session || !session.user) {
      console.error("User session not found");
      return;
    }
    const userName = session.user.name || "Guest";

    let a = await initiate(amount, userName, paymentform);
    let orderId = a.id;
    console.log(amount);
    
    const options: RazorpayOptions = {
      key_id: process.env.KEY_ID!, // Replace with your actual Razorpay Key ID
      amount: String(amount  / 100), // Convert amount to paise
      currency: "INR",
      name: userName,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: "http://localhost:3000/api/razorpay",
      prefill: {
        name: paymentform.name || "Guest",
        email: session.user.email || "email@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log(amount);
    

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    pay(Number(paymentform.amount) * 100);
  };


  return (
    <div className="max-w-md w-screen mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-200 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Donate Money For my Projects
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-3 md:flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4 w-full">
          <LabelInputContainer>
            <Label htmlFor="firstname">Name</Label>
            <Input
              id="firstname"
              placeholder="Tanmay Kumar"
              type="text"
              name="name"
              onChange={handleChange}
              value={paymentform.name}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="message">Message <span>(in 100 characters)</span></Label>
            <Input
              id="message"
              placeholder="Big Fan Brother"
              type="text"
              maxLength={100}
              name="message"
              onChange={handleChange}
              value={paymentform.message}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="₹100"
              type="number"
              name="amount"
              onChange={handleChange}
              value={paymentform.amount}
            />
          </LabelInputContainer>
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Pay &rarr;
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
