import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { removeMember } from "../services/member.service";

const useRemoveMember = (workspaceId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId) =>
      removeMember(workspaceId, memberId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });

      toast.success("Member removed!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove member"
      );
    },
  });
};

export default useRemoveMember;