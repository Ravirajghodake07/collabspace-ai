import api from "../lib/axios";

export const getDocuments = async (workspaceId) => {
  const response = await api.get(
    `/documents/workspaces/${workspaceId}/documents`
  );

  return response.data;
};

export const createDocument = async (workspaceId, title) => {
  const response = await api.post(
    `/documents/workspaces/${workspaceId}/documents`,
    {
      title,
    }
  );

  return response.data;
};
export const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

export const updateDocument = async (id, data) => {
  const response = await api.put(`/documents/${id}`, data);
  return response.data;
};
export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};