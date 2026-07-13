const prisma = require("../config/prisma");

const createDocument = async (data) => {
  return prisma.document.create({
    data,
  });
};

const getWorkspaceDocuments = async (workspaceId) => {
  return prisma.document.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

const getDocumentById = async (id) => {
  return prisma.document.findUnique({
    where: {
      id,
    },
    include: {
      workspace: true,
    },
  });
};

const updateDocument = async (id, data) => {
  return prisma.document.update({
    where: {
      id,
    },
    data,
  });
};

const deleteDocument = async (id) => {
  return prisma.document.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createDocument,
  getWorkspaceDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};