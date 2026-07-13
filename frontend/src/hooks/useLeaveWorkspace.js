import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { leaveWorkspace } from "../services/member.service";

const useLeaveWorkspace = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveWorkspace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      toast.success("You left the workspace.");

      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to leave workspace"
      );
    },
  });
};

export default useLeaveWorkspace;