import { Outlet } from "react-router";
import Header from "../Components/Shared/Header";
import Sidebar from "../Components/Shared/Sidebar";
import { IMAGE } from "../assets/index.image";

const Dashboard = () => {
  return (
    <div className="h-screen bg-secondary-background overflow-hidden p-6">
      <div className="flex h-full gap-4 overflow-hidden">
        {/* Sidebar Container */}
        <div className="w-[300px]  !overflow-hidden flex flex-col bg-background rounded-xl">
          {/* 1. Fixed Logo Section */}
          <div className="h-20 pt-10 flex items-center justify-center flex-shrink-0 ">
            <img
              src={IMAGE.brandLogo}
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/*  Scrollable Nav Items Section */}
          <div className="flex-1 overflow-y-auto scroll-bar-hide mt-5 pb-5 -pink-600">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen bg-secondary-background">
          <Header />
          <div className="flex-1 py-6 overflow-y-auto scroll-bar-hide">
            <div className="rounded-md">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
