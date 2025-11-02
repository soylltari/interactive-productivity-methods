import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex flex-col justify-center items-center text-center min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-56px)] px-10 my-4 gap-10">
        <Outlet />
      </main>
    </div>
  );
}
