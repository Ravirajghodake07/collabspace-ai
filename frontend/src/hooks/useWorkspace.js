import { useQuery } from "@tanstack/react-query";

import { getWorkspaceById } from "../services/workspace.service";

const useWorkspace = (id) => {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
  });
};

export default useWorkspace;