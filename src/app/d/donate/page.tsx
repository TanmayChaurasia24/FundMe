"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Github, Globe, DollarSign } from "lucide-react";

interface AllProjectType {
  username: string;
  id: string;
  projectName: string;
  projectDescription: string;
  projectLiveLink: string;
  githubRepoLink: string;
  fundGoal: number;
}

export default function Page() {

  const router = useRouter();
  const [allProjects, setProjects] = useState<AllProjectType[]>([]);

  useEffect(() => {
    const showAllProjects = async () => {
      try {
        const response = await axios.get<AllProjectType[]>(
          "/api/projects/showall"
        );

        if (!response || !response.data) {
          console.log("No project found");
          return;
        }
        console.log(response.data);
        
        setProjects(response.data); 
      } catch (error: any) {
        console.log("Error in fetching all the projects", error);
      }
    };

    showAllProjects();
  }, []);

  const handledonate = async (username: string) => {
    try {
      router.push(`publicprofile/${username.replace(/\s+/g, "_")}`)    
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        {allProjects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <Card key={project.id} className="bg-slate-950 text-neutral-200">
                <CardHeader>
                  <div>
                  <div><span className="font-bold text-green-500 text-xl">Owner: </span>{project.username}</div>
                  <CardTitle>{project.projectName}</CardTitle>
                  </div>
                  <CardDescription>
                    {project.projectDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col space-y-2">
                      {project.projectLiveLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-blue-700 border-none rounded-lg"
                        >
                          <a
                            href={project.projectLiveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Globe className="mr-2 h-4 w-4" /> Live Project
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="bg-blue-700 border-none rounded-lg"
                      >
                        <a
                          href={project.githubRepoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" /> GitHub Repository
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge variant="secondary" className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    Fund Goal: ${project.fundGoal.toLocaleString()}
                  </Badge>
                  <Button onClick={() => handledonate(project.username)}>Fund This Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          &copy; 2024 Crowdfunding Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
