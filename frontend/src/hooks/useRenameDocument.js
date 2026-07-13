import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateDocument } from "../services/document.service";

const useRenameDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }) =>
      updateDocument(id, { title }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["document", variables.id],
      });

      toast.success("Document renamed!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to rename document"
      );
    },
  });
};

export default useRenameDocument;