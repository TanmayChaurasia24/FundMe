import { dbconnect } from '../../../../db/db';
import { NextRequest, NextResponse } from 'next/server';

dbconnect();

export const GET = async (req: NextRequest) => {
    try {
        const response = NextResponse.json({
            message: "logout successfully",
        },{status:201})

        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    } catch (error: any) {
        console.error("Error in POST request:", error.message);
        return NextResponse.json(
            { error: "Internal Server Error: " + error.message },
            { status: 500 }
        );
    }
};



