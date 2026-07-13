const documentRepository = require("../repositories/document.repository");
const memberRepository = require("../repositories/member.repository");
const createDocument = async (workspaceId, title) => {
  return documentRepository.createDocument({
    workspaceId,
    title,
    content: "",
  });
};

const getWorkspaceDocuments = async (workspaceId) => {
  return documentRepository.getWorkspaceDocuments(workspaceId);
};

const getDocumentById = async (id, userId) => {

  const document =
    await documentRepository.getDocumentById(id);

  if (!document) {
    throw new Error("Document not found");
  }

  const member =
    await memberRepository.findWorkspaceMember(
      document.workspaceId,
      userId
    );

  if (!member) {
    throw new Error("Access denied");
  }

  return document;
};

const updateDocument = async (id, data, userId) => {
  await getDocumentById(id, userId);

  return documentRepository.updateDocument(id, data);
};

const deleteDocument = async (id, userId) => {
  await getDocumentById(id, userId);

  return documentRepository.deleteDocument(id);
};

module.exports = {
  createDocument,
  getWorkspaceDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};