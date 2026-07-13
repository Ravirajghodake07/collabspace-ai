import { Link, useNavigate } from "react-router-dom";
import { FolderOpen } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        h-16
        bg-[#0F172A]/95
        backdrop-blur-md
        border-b
        border-slate-700
        shadow-lg
      "
    >
      <div className="h-full px-8 flex items-center justify-between">

        

        <Link
          to="/dashboard"
          className="flex items-center gap-3 group"
        >
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <FolderOpen
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-white
                group-hover:text-blue-400
                transition
              "
            >
              CollabSpace AI
            </h1>

            <p className="text-xs text-slate-400">
              AI Collaborative Workspace
            </p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="
            px-6
            py-2.5
            rounded-xl
            text-white
            font-semibold
            bg-gradient-to-r
            from-red-500
            to-red-600
            hover:from-red-600
            hover:to-red-700
            transition
            shadow-lg
          "
        >
          Logout
        </button>

      </div>
    </header>
  );
}

export default Navbar;