"use client"

import React from "react";

const Page = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
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
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="projectDescription">
                Project Description (150 characters)
              </label>
              <textarea
                name="project-description"
                id="projectDescription"
                rows={5}
                placeholder="Describe your project"
                className="rounded-lg p-1 w-[30vw] text-black"
                maxLength={150}
              ></textarea>
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="projectLink">Project live link</label>
              <input
                type="url"
                id="projectLink"
                placeholder="https://your-project.com"
                className="rounded-lg p-1 w-[30vw] text-black"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="githubRepo">Github Repository Link</label>
              <input
                type="url"
                id="githubRepo"
                placeholder="https://github.com/username/project"
                className="rounded-lg p-1 w-[30vw] text-black"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="fundingGoals">Funding Goals (₹)</label>
              <input
                type="number"
                id="fundingGoals"
                placeholder="₹5000"
                className="rounded-lg p-1 w-[30vw] text-black"
                max={20000}
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
