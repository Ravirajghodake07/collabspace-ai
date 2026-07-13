import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TipTapEditor from "../../components/editor/TipTapEditor";
import DeleteDocumentModal from "../../components/common/DeleteDocumentModal";
import AISidebar from "../../components/ai/AISidebar";

import useDocument from "../../hooks/useDocument";
import useUpdateDocument from "../../hooks/useUpdateDocument";
import useRenameDocument from "../../hooks/useRenameDocument";
import useDeleteDocument from "../../hooks/useDeleteDocument";

import socket from "../../socket/socket";
import { useSidebar } from "../../context/SidebarContext";
import useAuth from "../../hooks/useAuth";
import {
  downloadAsText,
  downloadAsHTML,
} from "../../utils/downloadDocument";
import {
  Pencil,
  Trash2,
  Download,
  Globe,
  Users,
} from "lucide-react";
function Document() {
  const { id } = useParams();

  const [documentContent, setDocumentContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [aiInsertText, setAiInsertText] = useState("");
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDocument(id);

  const updateMutation = useUpdateDocument();
  const renameMutation = useRenameDocument();
  const deleteMutation = useDeleteDocument();
  const { setSidebarItems } = useSidebar();
  const { user } = useAuth();
  const document = data?.data;

  useEffect(() => {
    if (document?.content) {
      setDocumentContent(
        document.content.replace(/<[^>]+>/g, "")
      );
    }
  }, [document]);
  useEffect(() => {
    if (!document) return;

    setSidebarItems([
        {
         icon: "🏠",
        label: "Dashboard",
        path: "/dashboard",
        },
        {
        icon: "📁",
        label: document.workspace?.name || "Workspace",
        path: `/workspace/${document.workspaceId}`,
        },
        {
        icon: "📄",
        label: document.title,
        path: `/documents/${document.id}`,
        },
    ]);
    }, [document,setSidebarItems]);
  useEffect(() => {
    if (!id) return;

    socket.emit("join-document", {
        documentId: id,
        user,
    });

    socket.on("joined-document", (documentId) => {
      console.log("✅ Joined room:", documentId);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.emit("leave-document", id);
      socket.off("joined-document");
      socket.off("online-users");
    };
  }, [id,user]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <h2 className="text-red-600">
          {error?.response?.data?.message ||
            "Failed to load document"}
        </h2>
      </DashboardLayout>
    );
  }

  const handleSave = (content) => {
    updateMutation.mutate({
      id,
      data: {
        title: document.title,
        content,
      },
    });
  };

  const handleRename = () => {
    const newTitle = prompt(
      "Enter new document title:",
      document.title
    );

    if (!newTitle || newTitle === document.title) return;

    renameMutation.mutate({
      id,
      title: newTitle,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      id,
      workspaceId: document.workspaceId,
    });
  };
  const handleDownloadText = () => {
    downloadAsText(
        document.title,
        document.content
    );
  };

    const handleDownloadHTML = () => {
    downloadAsHTML(
        document.title,
        document.content
    );
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-5xl font-bold text-white">
            {document.title}
          </h1>

          <div className="mt-3">
            
                <div className="flex items-center gap-2 text-green-500 font-semibold">
                    <Users size={18} />
                    <span>Currently Editing</span>
                </div>
            

            <div className="mt-2 space-y-1">
                {onlineUsers.length === 0 ? (
                <p className="text-slate-400 text-sm">
                    No collaborators online
                </p>
                ) : (
                onlineUsers.map((user) => (
                    <div
                    key={user.id}
                    className="flex items-center gap-2 text-slate-200"
                    >
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>

                    <span>{user.name}</span>
                    </div>
                ))
                )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">

            <button
                onClick={handleRename}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition"
            >
                <Pencil size={18} />
                <span>Rename</span>
            </button>

            <button
                onClick={handleDownloadText}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition"
            >
                <Download size={18} />
                <span>TXT</span>
            </button>

            <button
                onClick={handleDownloadHTML}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl transition"
            >
                <Globe size={18} />
                <span>HTML</span>
            </button>

            <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">
                <Trash2 size={18} />
                <span>Delete</span>
            </button>

            </div>
      </div>

      <div className="flex gap-6 items-start">

        <div className="w-[70%] min-w-0">
            <TipTapEditor
            documentId={id}
            content={document.content}
            onSave={handleSave}
            onContentChange={setDocumentContent}
            aiInsertText={aiInsertText}
            />
        </div>

        <div className="w-[30%] min-w-[320px] max-w-[420px] shrink-0 sticky top-24 self-start">
            <AISidebar
            documentContent={documentContent}
            onInsert={(text) => {
                setAiInsertText("");
                setTimeout(() => {
                setAiInsertText(text);
                }, 0);
            }}
            />
        </div>

        </div>

      <DeleteDocumentModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}

export default Document;