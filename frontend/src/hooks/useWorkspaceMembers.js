import { useQuery } from "@tanstack/react-query";

import { getWorkspaceMembers } from "../services/member.service";

const useWorkspaceMembers = (workspaceId) => {
  return useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () =>
      getWorkspaceMembers(workspaceId),
  });
};

export default useWorkspaceMembers;