import React from "react";
import { SignupFormDemo } from "../../components/Dashboardform";
const Dashboard = () => {
  return (
    <div className="h-[90vh] m-5 overflow-hidden">
      <h2 className="font-bold text-5xl text-neutral-200 dark:text-neutral-200 text-center">
        Welcome to Your Dashboard
      </h2>
      <SignupFormDemo />
    </div>
  );
};

export default Dashboard;
