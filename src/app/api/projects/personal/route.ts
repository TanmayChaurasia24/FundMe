import { dbconnect } from "@/db/db";
import Project from "@/models/ProjectModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export const POST = async (req: NextRequest) => {
  try {
    // @ts-ignore
    const {username} = req.json()

    console.log("username after req: " + username);

    if (!username) {

      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const dbresponse = await Project.find({ username });

    if (!dbresponse || dbresponse.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }


    return NextResponse.json({ projects: dbresponse }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error while fetching your projects", error: error.message },
      { status: 500 }
    );
  }
};
