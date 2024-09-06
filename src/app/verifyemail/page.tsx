"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
const verifyEmail = () => {
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
      });
      setverified(true);
      console.log(response);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    settoken(urltoken || "");
    console.log(urltoken);

    // const { query } = Router;
    // const urltoken2 = query.token;
    // // settoken(urltoken2 || "");
    // console.log(urltoken2);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-400 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      {verified ? (
        <div>
          <h2 className="p-2 bg-green-400 text-black">Email Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      ) : (
        <h2 className="p-2 bg-red-400 text-black">Email Not Verified</h2>
      )}
    </div>
  );
};
export default verifyEmail;