import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";

export const GET = async (req: NextRequest) => {
    try {
        const username = await req.nextUrl.searchParams.get("username");

        if(!username) {
            return NextResponse.json({
                message: "username is not provided"
            },{status: 411})
        }

        const dbresponse = await User.findOne({username})

        if(!dbresponse) {
            return NextResponse.json({
                message: "username is not found"
            })
        }

        console.log(dbresponse);
        return NextResponse.json({
            data: dbresponse
        },{status: 201})

    } catch (error: any) {
        return NextResponse.json({
            message: "error while getting public profile of the user",
            error: error
        },{status: 500})
    }
}