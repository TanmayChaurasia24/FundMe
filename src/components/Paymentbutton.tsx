"use client";
import React from "react";
import { Toaster } from "sonner";

export function TailwindcssButtons() {
  return (
    <div className="pb-40 px-4 w-full">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto gap-10">
        {buttons.map((button, idx) => (
          // Enclose JSX inside parentheses and add a key prop  
          <div key={idx}>
            {button.component}
          </div>
        ))}
      </div>
    </div>
  );
}

// Array of button objects
export const buttons = [
  {
    name: "$10",
    description: "Donate $10",
    component: (
      <button className="px-6 py-2 bg-neutral-200 text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Donate $10
      </button>
    ),
  },
  {
    name: "$50",
    description: "Donate $30",
    component: (
      <button className="px-6 py-2 bg-neutral-200 text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Donate $50
      </button>
    ),
  },
  {
    name: "$100",
    description: "Donate $100",
    component: (
      <button className="px-6 py-2 bg-neutral-200 text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Donate $100
      </button>
    ),
  },
];
