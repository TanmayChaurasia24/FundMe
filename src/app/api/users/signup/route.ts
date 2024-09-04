import { dbconnect } from '../../../../db/db';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendemail } from '@/helpers/mailer';

// Connect to the database
dbconnect();

export const POST = async (req: NextRequest) => {
    try {
        // Parse request body
        const reqbody = await req.json();
        const { username, email, password } = reqbody;

        console.log("Request Body:", reqbody);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            console.log("User already exists with email:", email);
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);

        // Create new user object
        const newuser = new User({
            username,
            email,
            password: hashedpass
        });

        const saveduser = await newuser.save();
        console.log("User saved:", saveduser);

        await sendemail({ email, emailtype: "VERIFY", userid: saveduser._id });
        console.log("Verification email sent to:", email);

        return NextResponse.json({ message: 'User registration successful' }, { status: 200 });

    } catch (error: any) {
        console.error("Error in POST request:", error.message);
        return NextResponse.json(
            { error: "Internal Server Error: " + error.message },
            { status: 500 }
        );
    }
};
