"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { fetchuser,fetchpayments } from "@/actions/Useractions";
import Link from "next/link";
export function ThreeDCardDemo() {

  const [currentUser, setcurrentUser] = useState({})
  const [payments, setpayments] = useState({})

  useEffect(() => {
    get_money_doanted_data()
  },[])
  
  const get_money_doanted_data = async () => {
    const u = fetchuser("tanmay")
    setcurrentUser(u)
    const dbpayments = fetchpayments("tanmay")
    setpayments(dbpayments)
  }

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-neutral-200 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-12 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          Fans who Donated Money
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4 text-slate-800">
            <p>shubham donated 30 ruppee</p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
