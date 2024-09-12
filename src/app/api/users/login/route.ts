import { dbconnect } from "../../../../db/db";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Connect to the database
dbconnect();

export const POST = async (req: NextRequest) => {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;

    console.log("Request Body:", reqbody);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User dont exists with email:", email);
      return NextResponse.json({ error: "User not exists" }, { status: 400 });
    }

    const compass = await bcrypt.compare(password, user.password);

    if (!compass) {
      return NextResponse.json(
        { error: "check your password" },
        { status: 400 }
      );
    }

    const tokendata = {
      id: user._id,
      email: user.email,
    };

    const jwttoken = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    cookies().set("token", jwttoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    const Token = cookies().get("token");
    const response = NextResponse.json(
      {
        message: "loged in success",
        Cookie: Token
      },
      { status: 201 },
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
