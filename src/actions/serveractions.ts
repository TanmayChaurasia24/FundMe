"use server";
import bcrypt from "bcrypt";
import { dbconnect } from "@/db/db";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const handleSignup = async (formdata: FormData) => {
  console.log("Inside signup handler");

  const username = formdata.get("username") as string | undefined;
  const email = formdata.get("email") as string | undefined;
  const password = formdata.get("password") as string | undefined;

  if (!username || !email || !password) {
    console.error("Missing credentials");
    return {
      message: "Please enter all required credentials",
      status: 400,
      success: false,
    };
  }

  try {
    await dbconnect();
    console.log("Database connected");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`User already exists with email: ${email}`);
      return {
        message: "User already exists. Please log in.",
        status: 409,
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("New user created:", newUser);

    return redirect("/login");
  } catch (error) {
    console.error("Error during user creation:", error);
    return {
      message: "An error occurred while signing up. Please try again later.",
      status: 500,
      success: false,
    };
  }
};

export const handleLogin = async (formdata: FormData) => {
  console.log("Inside login handler");

  const email = formdata.get("email")?.toString();
  const password = formdata.get("password")?.toString();

  if (!email || !password) {
    console.error("Missing credentials");
    return {
      message: "Please enter both email and password",
      status: 400,
      success: false,
    };
  }

  try {
    console.log("stage 2");

    const result = await User.findOne({ email });

    if (!result) {
      return redirect("/signup");
    }

    console.log("stage 3");
    const iscorrectpass = await bcrypt.compare(password , result.password);
    if (!iscorrectpass) {
      return redirect("/login");
    }
    const cookiestore = await cookies();
    cookiestore.set("session", result._id, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.log("User logged in successfully");

    return redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    return {
      message: "An error occurred while logging in. Please try again later.",
      status: 500,
      success: false,
    };
  }
};
