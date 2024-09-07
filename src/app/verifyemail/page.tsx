"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const verifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerified(true);
      console.log(response);
    } catch (err: any) {
      console.error(err.message);
      setError(true);
    }
  };

  useEffect(() => {
    // Use URLSearchParams to get the token from the query parameters
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token"); // 'token' should match the query parameter name
    console.log("Token received:", urlToken);

    if (urlToken) {
      setToken(urlToken);
    }
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
      {error && (
        <h2 className="p-2 bg-red-500 text-white">Verification Failed</h2>
      )}
    </div>
  );
};

export default verifyEmail;
