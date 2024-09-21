"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { ThreeDCardDemo } from "../../components/FansBgCard";
import { TailwindcssButtons } from "../../components/Paymentbutton";
import { PlaceholdersAndVanishInputDemo } from "../../components/Makepayment";
import Razorpay from "razorpay";
import { initiate } from "@/actions/Useractions";

const Username = ({ params }) => {
  const [paymentform,setpaymentform] = useState({});

  const token = Cookies.get("token");

  if (!!token) {
    const router = useRouter();
    router.push("/login");
  }

  const handlechange = () => {

  }

  const pay = async(amount) => {
    let a = await initiate(amount,session?.user.name, paymentform);
    let orderId = a.id;
    var options = {
      key_id: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "FundMe", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:3000/api/razorpay",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <div className="w-full cover relative">
        <img
          className="w-full object-cover h-[350]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/16.gif?token-time=1728000000&token-hash=wSuXa5NkmV6E2Cud5d-IPAIyw5tlVp_71iHLQXFQfX0%3D"
          alt="Campaign Image"
        />

        <div className="absolute right-[47%] -bottom-14 border border-white rounded-full">
          <img
            src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/4.gif?token-time=1727222400&amp;token-hash=PkqkQ1w648At7oGUM5tnlK07-q_sAPIUTks-p7ZP7Fc%3D"
            alt=""
            height={105}
            width={105}
            data-tag="creator-public-page-avatar"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="info flex justify-center items-center mt-24 text-white flex-col gap-2">
        <div className="font-bold text-2xl">@{params.username}</div>
        <div className="text-slate-400">creating animated art for VTT</div>
        <div className="text-slate-400">
          343234 posts . $3452/release . 2342 members
        </div>
      </div>

      <div className="payments flex gap-5 w-[70%] mx-auto mb-2">
        <ThreeDCardDemo />
        <div className="flex flex-col h-[40vh] justify-center items-center mt-[275px]">
          <PlaceholdersAndVanishInputDemo />  
          <div className="flex justify-center items-center mt-5">
            <TailwindcssButtons />
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
