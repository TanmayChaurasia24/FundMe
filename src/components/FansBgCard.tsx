"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import {ExpandableCardDemo} from '../components/Fansdonation'
export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-slate-900 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-12 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-100 dark:text-white"
        >
          Fans who Donated Money
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
            <ExpandableCardDemo/>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
