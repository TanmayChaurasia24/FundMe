import { dbconnect } from '../../../../db/db';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDataFromToken } from '../../../../helpers/getDataFromToken';

// Connect to the database
dbconnect();

export const POST = async (req: NextRequest) => {
    try {
        const userid = await getDataFromToken(req);
        const user = await User.findOne({_id:userid}).select("-password");

        if(!user) {
            return NextResponse.json({
                message: "user not found",
            },{
                status: 400,
            })
        }

        return NextResponse.json({
            message: "user found",
            data: user,
        },{
            status: 201
        })

    } catch (error: any) {
        console.error("Error in POST request:", error.message);
        return NextResponse.json(
            { error: "Internal Server Error: " + error.message },
            { status: 500 }
        );
    }
};



