import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CreateWorkspaceModal from "../../components/common/CreateWorkspaceModal";
import WorkspaceCard from "../../components/common/WorkspaceCard";

import useWorkspaces from "../../hooks/useWorkspaces";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useWorkspaces();

  const filteredWorkspaces =
    data?.data?.filter((workspace) =>
      workspace.name
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold text-white">
            Loading...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold text-red-500">
            Something went wrong!
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-bold text-white">
            Your Workspaces
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Manage your AI collaborative workspaces.
          </p>

        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="
            px-6
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
          + Create Workspace
        </button>

      </div>

     

      <div className="mb-10">

        <input
          type="text"
          placeholder="🔍 Search workspaces..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            md:w-[420px]
            px-5
            py-3
            rounded-xl
            bg-[#141b2d]
            border
            border-slate-700
            text-white
            placeholder:text-slate-500
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

     

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredWorkspaces.length > 0 ? (

          filteredWorkspaces.map((workspace) => (

            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
            />

          ))

        ) : (

          <div
            className="
              col-span-full
              bg-[#141b2d]
              border
              border-slate-700
              rounded-2xl
              p-12
              text-center
              shadow-xl
            "
          >

            <h2 className="text-3xl font-bold text-white">

              {search
                ? "No Matching Workspaces"
                : "No Workspaces Yet"}

            </h2>

            <p className="text-slate-400 mt-4 text-lg">

              {search
                ? "Try another search keyword."
                : "Create your first collaborative workspace."}

            </p>

          </div>

        )}

      </div>

      <CreateWorkspaceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

    </DashboardLayout>
  );
}

export default Dashboard;