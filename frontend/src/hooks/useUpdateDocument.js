import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocument } from "../services/document.service";

const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateDocument(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["document", variables.id],
      });
    },
  });
};

export default useUpdateDocument;