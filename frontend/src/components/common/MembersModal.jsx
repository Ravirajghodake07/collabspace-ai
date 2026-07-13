import { useState } from "react";

import useInviteMember from "../../hooks/useInviteMember";
import useUpdateMemberRole from "../../hooks/useUpdateMemberRole";
import useRemoveMember from "../../hooks/useRemoveMember";
import useLeaveWorkspace from "../../hooks/useLeaveWorkspace";
import useAuth from "../../hooks/useAuth";
import {
  Users,
  Crown,
  UserMinus,
  UserPlus,
  X,
} from "lucide-react";
function MembersModal({
  isOpen,
  onClose,
  members,
  workspaceId,
}) {
  const [email, setEmail] = useState("");

  const inviteMutation = useInviteMember(workspaceId);
  const roleMutation = useUpdateMemberRole(workspaceId);
  const removeMutation = useRemoveMember(workspaceId);
   const leaveMutation = useLeaveWorkspace();
   const { user } = useAuth();
  if (!isOpen) return null;

  const handleInvite = () => {
    if (!email.trim()) return;

    inviteMutation.mutate(email, {
      onSuccess: () => {
        setEmail("");
      },
    });
  };

  const handleRoleChange = (memberId, role) => {
    roleMutation.mutate({
      memberId,
      role,
    });
  };

  const handleRemove = (memberId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmDelete) return;

    removeMutation.mutate(memberId);
  };
  const handleLeave = () => {
    const confirmLeave = window.confirm(
        "Are you sure you want to leave this workspace?"
    );

    if (!confirmLeave) return;

    leaveMutation.mutate(workspaceId);
    };
  const currentMember = members.find(
  (member) => member.user.id === user?.id
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div
  className="
    bg-[#141b2d]
    border
    border-slate-700
    rounded-2xl
    shadow-2xl
    w-[650px]
    max-h-[85vh]
    overflow-hidden
  "
>

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <div className="flex items-center gap-3">

            <Users
                size={28}
                className="text-blue-400"
            />

            <h2 className="text-2xl font-bold text-white">
                Workspace Members
            </h2>

            </div>

          <button
            onClick={onClose}
            className="
            text-slate-400
            hover:text-white
            transition
            "
          >
            <X size={24} />
          </button>

        </div>

        {/* Members */}

        <div className="max-h-[380px] overflow-y-auto p-5 space-y-4">

          {members.length === 0 ? (

            <p className="text-slate-400">
              No members found.
            </p>

          ) : (

            members.map((member) => (

              <div
                key={member.id}
                className="
                border
                border-slate-700
                bg-[#1b2438]
                rounded-xl
                p-4
                flex
                justify-between
                items-center
                hover:border-blue-500
                transition
                "
              >

                <div>

                  <h3 className="font-semibold text-lg text-white">
                    {member.user.name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {member.user.email}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  {member.role === "OWNER" ? (
                    <div className="flex items-center gap-2">

                        <Crown
                        size={16}
                        />

                        OWNER

                    </div>

                  ) : (

                    <>
                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleRoleChange(
                            member.id,
                            e.target.value
                          )
                        }
                        className="
                        bg-slate-800
                        border
                        border-slate-700
                        text-white
                        rounded-lg
                        px-3
                        py-2
                        "
                      >
                        <option value="ADMIN">
                          ADMIN
                        </option>

                        <option value="MEMBER">
                          MEMBER
                        </option>

                      </select>

                      <button
                        onClick={() =>
                          handleRemove(member.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                        <UserMinus size={16} />
                        Remove
                        </div>
                      </button>
                    </>

                  )}

                </div>

              </div>

            ))

          )}
          {currentMember?.role !== "OWNER" && (
            <div className="border-t p-5">
                <button
                onClick={handleLeave}
                disabled={leaveMutation.isPending}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
                >
                {leaveMutation.isPending
                    ? "Leaving..."
                    : "Leave Workspace"}
                </button>
            </div>
            )}

        </div>

        {/* Invite Member */}

        <div className="border-t p-5">

          <div className="flex items-center gap-2">

            <UserPlus
            size={20}
            className="text-blue-400"
            />

            Invite Member

            </div>

          <input
            type="email"
            placeholder="Enter registered email..."
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            text-white
            placeholder:text-slate-500
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

          <button
            onClick={handleInvite}
            disabled={inviteMutation.isPending}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            {inviteMutation.isPending
              ? "Inviting..."
              : "Invite Member"}
          </button>

          {inviteMutation.isError && (

            <p className="text-red-600 mt-3 text-sm">
              {inviteMutation.error?.response?.data?.message ||
                "Failed to invite member"}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default MembersModal;