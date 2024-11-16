import { dbconnect } from "../../../../db/db";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

dbconnect();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log("Request Body:", reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User doesn't exist with email:", email);
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log("Password mismatch for user:", email);
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }


    const tokenData = {
      id: user._id,
      email: user.email,
    };


    const jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const cookieStore = cookies();
    cookieStore.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
      sameSite: "lax",
    });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        token: jwtToken,
      },
      { status: 201 }
    );

    return response;
  } catch (error: any) {
    console.error("Error in POST request:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
};
