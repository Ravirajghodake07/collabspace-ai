import { useQuery } from "@tanstack/react-query";

import { getDocuments } from "../services/document.service";

const useDocuments = (workspaceId) => {
  return useQuery({
    queryKey: ["documents", workspaceId],
    queryFn: () => getDocuments(workspaceId),
    enabled: !!workspaceId,
  });
};

export default useDocuments;