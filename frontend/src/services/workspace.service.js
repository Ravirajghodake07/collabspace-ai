import api from "../lib/axios";

export const getWorkspaces = async () => {

  const response = await api.get("/workspaces");

  return response.data;

};
export const getWorkspaceById = async (id) => {

  const response = await api.get(`/workspaces/${id}`);

  return response.data;

};

export const createWorkspace = async (
  name,
  description
) => {

  const response = await api.post("/workspaces", {

    name,
    description,

  });

  return response.data;

};