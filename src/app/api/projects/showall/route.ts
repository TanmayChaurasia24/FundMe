import Project from "../../../../models/ProjectModel";
import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "../../../../db/db";

dbconnect();

export const GET = async (req: NextRequest) => {
    try {
        const allproject = await Project.find();

        return NextResponse.json(allproject);
    } catch (error) {
        return NextResponse.json({
            message: error
        },{status: 402})
    }
}