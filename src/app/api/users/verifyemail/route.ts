import { dbconnect } from "../../../../db/db";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export const POST = async (req: NextRequest) => {
  try {
    const reqbody = await req.json();
    const { token } = reqbody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    const saveduser =  await user.save()
    return NextResponse.json({
        message: "email verified sucessfully",
        saveduser
    },{status:201})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
