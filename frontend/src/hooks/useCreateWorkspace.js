import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createWorkspace } from "../services/workspace.service";

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, description }) =>
      createWorkspace(name, description),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      toast.success("Workspace created successfully!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to create workspace"
      );
    },
  });
};

export default useCreateWorkspace;