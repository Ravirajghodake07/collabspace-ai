import api from "../lib/axios";

export const getWorkspaceMembers = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/members`
  );

  return response.data;
};

export const inviteMember = async (
  workspaceId,
  email
) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/members`,
    {
      email,
    }
  );

  return response.data;
};

export const updateMemberRole = async (
  workspaceId,
  memberId,
  role
) => {
  const response = await api.patch(
    `/workspaces/${workspaceId}/members/${memberId}`,
    {
      role,
    }
  );

  return response.data;
};

export const removeMember = async (
  workspaceId,
  memberId
) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}/members/${memberId}`
  );

  return response.data;
};

export const leaveWorkspace = async (
  workspaceId
) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}/members/leave`
  );

  return response.data;
};