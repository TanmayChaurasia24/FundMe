"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          FundMe <br /> <p className="text-2xl ">
          A crowdfunding platform for creators get fund your projects
          </p>
          <div className="">
          <Link href={"/login"}> 
        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5"
          >
          Login
        </button>
          </Link>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
        </motion.h1>
      </LampContainer>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Your Fans Can Fund You
        </h1>
        <div className="flex gap-5 justify-around my-14">
          <div className="items space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={50}
              src="/icons8-businessman.gif"
              alt=""
            />
            <p className="font-bold">Your Fans Want's To Help</p>
            <p className="text-center">
              your fans are available to help in your project
            </p>
          </div>
          <div className="items space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-white rounded-full p-2 text-black"
              width={50}
              src="/icons8-coin.gif"
              alt=""
            />
            <p className="font-bold">Your Fans Want's To Help</p>
            <p className="text-center">
              your fans are available to help in your project
            </p>
          </div>
          <div className="items space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-white rounded-full p-2 text-black"
              width={50}
              src="/icons8-group.gif"
              alt=""
            />
            <p className="font-bold">Your Fans Want's To Help</p>
            <p className="text-center">
              your fans are available to help in your project
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center my-4">
          Learn More about us
        </h1>
        <div className="flex gap-5 justify-around my-14">
          <div className="items space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={50}
              src="/icons8-businessman.gif"
              alt=""
            />
            <p className="font-bold">Your Fans Want's To Help</p>
            <p className="text-center">
              your fans are available to help in your project
            </p>
          </div>
          <div className="items space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-white rounded-full p-2 text-black"
              width={50}
              src="/icons8-coin.gif"
              alt=""
            />
            <p className="font-bold">Your Fans Want's To Help</p>
            <p className="text-center">
              your fans are available to help in your project
            </p>
          </div>
          <div className="items space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-white rounded-full p-2 text-black"
              width={50}
              src="/icons8-group.gif"
              alt=""
            />
            <p className="font-bold">Your Fans Want's To Help</p>
            <p className="text-center">
              your fans are available to help in your project
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
