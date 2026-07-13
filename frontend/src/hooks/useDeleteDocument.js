import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteDocument } from "../services/document.service";

const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, }) =>
      deleteDocument(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["documents", variables.workspaceId],
      });

      toast.success("Document deleted!");

      navigate(`/workspace/${variables.workspaceId}`);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete document"
      );
    },
  });
};

export default useDeleteDocument;