import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { inviteMember } from "../services/member.service";

const useInviteMember = (workspaceId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email) =>
      inviteMember(workspaceId, email),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });

      toast.success("Member invited!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to invite member"
      );
    },
  });
};

export default useInviteMember;