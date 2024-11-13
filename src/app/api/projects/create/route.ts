import { dbconnect } from '../../../../db/db';
import Project from '../../../../models/ProjectModel';
import { NextRequest, NextResponse } from 'next/server';

dbconnect()

export const POST = async (req: NextRequest) => {
  try {
    const response = await req.json();
    const {projectName, projectDescription, projectLiveLink, githubRepoLink,  fundGoal} = response;

    if(!projectName || !projectDescription || !githubRepoLink || !fundGoal) {
      return NextResponse.json({
        message: "all fields are required"
      },{status: 402})
    }

    const existingProject = await Project.findOne({
      $or: [
        {
          projectName: projectName
        },
        {
          githubRepoLink: githubRepoLink
        }
      ]
    })

    if(existingProject) {
      return NextResponse.json({
        message: "project already exists"
      },{status: 402})
    }

    const created_response = await new Project({
      projectName,
      projectDescription,
      projectLiveLink,
      githubRepoLink,
      fundGoal
    }).save()

    return NextResponse.json({
      message: "project created successfully",
      data: created_response
    },{status: 201})

  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error while uploading a project: " + error.message,
      },
      { status: 500 }
    );
  }
};
