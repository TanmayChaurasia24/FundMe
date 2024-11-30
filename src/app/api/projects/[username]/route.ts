import { dbconnect } from "@/db/db";
import Project from "@/models/ProjectModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect()

export const GET = async (req: NextRequest) => {
    try {
        const username = await req.nextUrl.searchParams.get("username");

        if(!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const dbresponse = await Project.find({username: username})

        if(!dbresponse) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
            projects: dbresponse
        },{status: 201})
    } catch (error) {
        return NextResponse.json({
            message: "error while fetching your projects",
            error: error
        })
    }
}