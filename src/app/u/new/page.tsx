"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebase"; // Ensure Firebase is initialized here


interface FormDataTypes {
  projectName: string;
  projectDescription: string;
  projectLiveLink: string;
  githubRepoLink: string;
  fundGoal: number;
  username: string
}

const Page = () => {
  const router = useRouter();
  const auth = getAuth(app)
  const [user,setUser] = useState<any>(null);

  useEffect(() => {
    // Set up Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Store authenticated user data
        setformdata((prev) => ({
          ...prev,
          username: currentUser.displayName || "",
        }));
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, router]);

  const [formdata, setformdata] = useState<FormDataTypes>({
    projectName: "",
    projectDescription: "",
    projectLiveLink: "",
    githubRepoLink: "",
    username: "",
    fundGoal: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/projects/create", formdata);

      if (response.status === 201) {
        console.log("Project created successfully");
        router.push("/");
      }
    } catch (error: any) {
      console.log("Error in making project:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-900 h-[90vh] w-[100vw] text-neutral-200 overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[90%] w-[100%]">
        <h1 className="text-4xl font-bold">Submit your Project</h1>
        <div className="flex justify-center items-center h-[80%] w-[50%] mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                className="rounded-lg p-1 w-[30vw] text-black"
                onChange={handleChange}
                value={formdata.projectName}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="projectDescription">
                Project Description (150 characters)
              </label>
              <textarea
                name="projectDescription"
                id="projectDescription"
                rows={5}
                placeholder="Describe your project"
                className="rounded-lg p-1 w-[30vw] text-black"
                maxLength={150}
                value={formdata.projectDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="projectLiveLink">Project Live Link</label>
              <input
                type="url"
                id="projectLiveLink"
                name="projectLiveLink"
                placeholder="https://your-project.com"
                className="rounded-lg p-1 w-[30vw] text-black"
                value={formdata.projectLiveLink}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="githubRepoLink">GitHub Repository Link</label>
              <input
                type="url"
                id="githubRepoLink"
                name="githubRepoLink"
                placeholder="https://github.com/username/project"
                className="rounded-lg p-1 w-[30vw] text-black"
                value={formdata.githubRepoLink}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="fundGoal">Funding Goals (₹)</label>
              <input
                type="number"
                id="fundGoal"
                name="fundGoal"
                placeholder="₹5000"
                className="rounded-lg p-1 w-[30vw] text-black"
                max={20000}
                value={formdata.fundGoal}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 w-[100%] mt-3 rounded-lg font-bold p-1"
              aria-label="Submit Project"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
