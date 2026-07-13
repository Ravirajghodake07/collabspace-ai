import { useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { setSidebarItems } = useSidebar();

  useEffect(() => {
    setSidebarItems([
      {
        icon: "🏠",
        label: "Dashboard",
        path: "/dashboard",
      },
    ]);
  }, [setSidebarItems]);

  return (
    <div className="min-h-screen bg-[#0f172a]">

      <Navbar />

      <div className="flex pt-14">

        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main
          className={`
            flex-1
            min-h-[calc(100vh-56px)]
            p-8
            transition-all
            duration-300
            
            bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.15),transparent_40%),#1b2235]
            ${
              sidebarOpen ? "ml-64" : "ml-16"
            }
          `}
        >
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;