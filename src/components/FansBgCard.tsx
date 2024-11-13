"use client";
import React, { useEffect, useState } from "react";
import { fetchuser, fetchpayments } from "@/actions/Useractions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export function ThreeDCardDemo() {
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setpayments] = useState([]);
  const { data: session }: { data: Session | null } = useSession();

  const get_money_donated_data = async () => {
    const u = await fetchuser("tanmay"); // Await the fetchuser call
    setcurrentUser(u);

    if (!session || !session.user) {
      console.log("Session not found");
      return;
    }

    const dbpayments = await fetchpayments(session.user.name);
    setpayments(dbpayments);
  };
  useEffect(() => {
    if (session?.user) {
      get_money_donated_data();
    }
  }, [get_money_donated_data]);


  return (
    <div className="payment flex gap-3 mt-20">
      <div className="supporters bg-neutral-200 rounded-lg text-black p-10 w-[100%] max-h-fit">
        <h2 className="text-2xl text-center font-bold my-5">Fans who donated money</h2>
        <ul className="mx-5 text-lg">
          {payments.slice(0, 5).map((payment: any, index: number) => (
            <li key={index} className="my-4 gap-2 items-center list-disc">
              {payment.name} donated ₹{payment.amount / 100}, with a <br />message:{" "}
              <span className="font-bold">{payment.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
