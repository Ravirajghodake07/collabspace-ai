import { useNavigate } from "react-router-dom";

function WorkspaceCard({ workspace }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-[#0f172a]
        border
        border-slate-700
        rounded-2xl
        p-6
        shadow-lg
        hover:shadow-blue-500/20
        hover:border-blue-500
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      

      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        📁 {workspace.name}
      </h2>

    

      <p className="text-slate-400 mt-3 min-h-[48px]">
        {workspace.description || "No description provided."}
      </p>

    

      <div className="flex justify-between mt-6 text-sm">

        <div className="bg-slate-800 px-3 py-2 rounded-lg">
          <p className="text-slate-500">Role</p>

          <p className="font-semibold text-blue-400">
            {workspace.role}
          </p>
        </div>

        <div className="bg-slate-800 px-3 py-2 rounded-lg">
          <p className="text-slate-500">Workspace</p>

          <p className="font-semibold text-white">
            Active
          </p>
        </div>

      </div>

     

      <button
        onClick={() => navigate(`/workspace/${workspace.id}`)}
        className="
          mt-6
          w-full
          py-3
          rounded-xl
          text-white
          font-semibold
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          hover:from-blue-700
          hover:to-indigo-700
          transition
          shadow-lg
        "
      >
        Open Workspace →
      </button>
    </div>
  );
}

export default WorkspaceCard;