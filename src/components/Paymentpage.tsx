"use client";

import Image from "next/image";
import { ThreeDCardDemo } from "../components/FansBgCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // Ensure Firebase is initialized
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Globe, Github, Badge, DollarSign } from "lucide-react";
import { Button } from "./ui/button";

interface AllProjectType {
  username: string;
  id: string;
  projectName: string;
  projectDescription: string;
  projectLiveLink: string;
  githubRepoLink: string;
  fundGoal: number;
}

export default function UsernamePage({ username }: { username: string }) {
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.svg");
  const [myprojects, setMyProjects] = useState<AllProjectType[]>([]);
  const auth = getAuth(app);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAvatarUrl(currentUser.photoURL || "/placeholder.svg");
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe(); // Cleanup Firebase listener on unmount
  }, [auth, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<AllProjectType[]>(`/api/projects/${username.replace('_'," ")}`);
        setMyProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [username]);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("🦄 Payment done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [searchParams]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />

      <div className="min-h-screen bg-gray-900 text-white">
        <div className="relative">
          <Image
            src="/download.jpg"
            alt="Cover image"
            width={1920}
            height={350}
            className="w-full h-[350px] object-cover"
          />
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
            <Avatar className="h-28 w-28 border-4 border-white">
              <AvatarImage src={avatarUrl} alt={`@${username}'s avatar`} />
              <AvatarFallback>
                {username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 space-y-2">
          <h1 className="text-2xl font-bold">@{username || "Guest"}</h1>
          <p className="text-gray-400">Creating animated art for VTT</p>
          <p className="text-gray-400">
            343,234 posts · $3,452/release · 2,342 members
          </p>
        </div>

        <div className="payments flex justify-center items-center gap-5 w-[70%] mx-auto mb-2">
          <ThreeDCardDemo />
        </div>

        <div>
          <h1 className="text-center text-4xl">Your Projects</h1>
          {myprojects.length > 0 ? (
            myprojects.map((project) => (
              <Card key={project.id} className="bg-slate-950 text-neutral-200">
                <CardHeader>
                  <CardTitle>{project.projectName}</CardTitle>
                  <CardDescription>
                    {project.projectDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
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
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    Fund Goal: ${project.fundGoal.toLocaleString()}
                  </Badge>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center">No projects found.</p>
          )}
        </div>
      </div>
    </>
  );
}
