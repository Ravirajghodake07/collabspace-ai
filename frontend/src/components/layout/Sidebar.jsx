import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import useAuth from "../../hooks/useAuth";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { sidebarItems } = useSidebar();
  const { user } = useAuth();

  return (
    <aside
      className={`
        fixed
        top-16
        left-0
        h-[calc(100vh-64px)]
        bg-[#111827]/95
        backdrop-blur-xl
        border-r
        border-slate-700
        transition-all
        duration-300
        z-40
        flex
        flex-col
        shadow-2xl
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      

      <div
        className={`
          flex
          items-center
          ${isOpen ? "justify-end" : "justify-center"}
          p-4
          border-b
          border-slate-700
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-10
            h-10
            rounded-xl
            bg-slate-800
            hover:bg-blue-600
            text-white
            transition
          "
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

    

      <nav className="flex-1 py-4 px-2 space-y-2">

        {sidebarItems.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <span className="text-xl">
                {item.icon}
              </span>

              {isOpen && (
                <span className="font-medium truncate">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

      </nav>

  

      <div className="border-t border-slate-700 p-3">

        <Link
          to="/profile"
          className={`
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            transition
            ${
              location.pathname === "/profile"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }
          `}
        >
          <div
            className="
              w-11
              h-11
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-lg
              shadow-lg
            "
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {isOpen && (
            <div className="overflow-hidden">

              <p className="font-semibold truncate">
                {user?.name}
              </p>

              <p className="text-xs text-slate-400 truncate">
                View Profile
              </p>

            </div>
          )}
        </Link>

      </div>

    </aside>
  );
}

export default Sidebar;