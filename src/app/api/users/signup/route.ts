import { dbconnect } from '../../../../db/db';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';

dbconnect();

export const POST = async (req: NextRequest) => {
    try {
        
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};
