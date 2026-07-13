import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateMemberRole } from "../services/member.service";

const useUpdateMemberRole = (workspaceId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, role }) =>
      updateMemberRole(workspaceId, memberId, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });

      toast.success("Member role updated!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update role"
      );
    },
  });
};

export default useUpdateMemberRole;