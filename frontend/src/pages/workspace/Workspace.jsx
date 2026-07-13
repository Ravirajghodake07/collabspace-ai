import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CreateDocumentModal from "../../components/common/CreateDocumentModal";
import DocumentCard from "../../components/common/DocumentCard";
import MembersModal from "../../components/common/MembersModal";

import useWorkspace from "../../hooks/useWorkspace";
import useDocuments from "../../hooks/useDocuments";
import useWorkspaceMembers from "../../hooks/useWorkspaceMembers";
import { useSidebar } from "../../context/SidebarContext";

function Workspace() {
  const { id } = useParams();

  const [showMembers, setShowMembers] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: workspaceData, isLoading } = useWorkspace(id);
  const { data: documentsData } = useDocuments(id);
  const { data: membersData } = useWorkspaceMembers(id);

  const { setSidebarItems } = useSidebar();

  const workspace = workspaceData?.data;

  const filteredDocuments =
    documentsData?.data?.filter((document) =>
      document.title
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  useEffect(() => {
    if (!workspace) return;

    setSidebarItems([
      {
        icon: "🏠",
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        icon: "📁",
        label: workspace.name,
        path: `/workspace/${workspace.id}`,
      },
    ]);
  }, [workspace, setSidebarItems]);

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

  return (
    <DashboardLayout>

     

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          📁 {workspace.name}
        </h1>

        <p className="text-slate-400 text-lg mt-3">
          {workspace.description ||
            "No description provided."}
        </p>

      </div>

     

      <div className="mb-8">

        <input
          type="text"
          placeholder="🔍 Search documents..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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

      

      <div className="flex flex-wrap gap-4 mb-10">

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
          + New Document
        </button>

        <button
          onClick={() => setShowMembers(true)}
          className="
            px-6
            py-3
            rounded-xl
            bg-[#141b2d]
            border
            border-slate-700
            text-white
            hover:border-blue-500
            transition
          "
        >
          👥 Members
        </button>

      </div>

     

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredDocuments.length > 0 ? (

          filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
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
            "
          >
            <h2 className="text-3xl font-bold text-white">
              {search
                ? "No Matching Documents"
                : "No Documents Yet"}
            </h2>

            <p className="text-slate-400 mt-4">
              {search
                ? "Try another search keyword."
                : "Create your first document."}
            </p>
          </div>

        )}

      </div>

      <CreateDocumentModal
        workspaceId={id}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <MembersModal
        isOpen={showMembers}
        onClose={() => setShowMembers(false)}
        members={membersData?.data || []}
        workspaceId={id}
      />

    </DashboardLayout>
  );
}

export default Workspace;