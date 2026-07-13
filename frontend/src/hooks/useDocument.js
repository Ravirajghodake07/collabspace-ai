import { useQuery } from "@tanstack/react-query";

import { getDocumentById } from "../services/document.service";

const useDocument = (id) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocumentById(id),
    enabled: !!id,
  });
};

export default useDocument;