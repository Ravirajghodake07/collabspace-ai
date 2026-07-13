import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createDocument } from "../services/document.service";

const useCreateDocument = (workspaceId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title) =>
      createDocument(workspaceId, title),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents", workspaceId],
      });

      toast.success("Document created successfully!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create document"
      );
    },
  });
};

export default useCreateDocument;