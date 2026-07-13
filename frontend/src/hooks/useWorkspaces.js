import { useQuery } from "@tanstack/react-query";

import { getWorkspaces } from "../services/workspace.service";

const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
};

export default useWorkspaces;