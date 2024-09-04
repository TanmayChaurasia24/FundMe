import { dbconnect } from '../../../../db/db';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendemail } from '@/helpers/mailer';

dbconnect();

export const POST = async (req: NextRequest) => {
    try {
        const reqbody = await req.json();
        const {username,email,password} = reqbody;

        console.log(reqbody);

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({error:"Message already exists"},{status:400});
        }
        
        const salt = await bcrypt.genSalt(20);
        const hashedpass = await bcrypt.hash(password,salt);

        const newuser = new User({
            username,
            email,
            password:hashedpass
        });

        const saveduser = await newuser.save()
        console.log(saveduser);
        
        await sendemail({email,emailtype:"VERIFY",userid:saveduser._id});

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};
