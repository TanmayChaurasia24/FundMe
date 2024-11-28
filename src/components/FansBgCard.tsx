"use client";
import React, { useEffect, useState } from "react";
import { fetchuser, fetchpayments } from "../actions/Useractions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // Ensure your Firebase app is initialized here

export function ThreeDCardDemo() {
  const [user, setUser] = useState<any>(null); // State to track logged-in user
  const [payments, setPayments] = useState([]);

  const auth = getAuth(app); // Get Firebase auth instance

  const getMoneyDonatedData = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }

    const dbPayments = await fetchpayments(user.displayName || user.email);
    setPayments(dbPayments);
  };

  // Listen for user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Fetch payment data when user is authenticated
  useEffect(() => {
    if (user) {
      getMoneyDonatedData();
    }
  }, [user]);

  return (
    <div className="payment flex gap-3 mt-20">
      <div className="supporters bg-neutral-200 rounded-lg text-black p-10 w-[100%] max-h-fit">
        <h2 className="text-2xl text-center font-bold my-5">Fans who donated money</h2>
        <ul className="mx-5 text-lg">
          {payments.slice(0, 5).map((payment: any, index: number) => (
            <li key={index} className="my-4 gap-2 items-center list-disc">
              {payment.name} donated ₹{payment.amount / 100}, with a <br />
              message: <span className="font-bold">{payment.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
