const documentService = require("../services/document.service");
const ApiResponse = require("../utils/ApiResponse");

const createDocument = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const { title } = req.body;

    const document = await documentService.createDocument(
      workspaceId,
      title
    );

    return res.status(201).json(
    new ApiResponse(
        true,
        "Document created successfully",
        document
    )
    );
  } catch (error) {
    console.error("CREATE DOCUMENT ERROR:", error);
    next(error);
  }
};

const getWorkspaceDocuments = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;

    const documents =
      await documentService.getWorkspaceDocuments(workspaceId);

    return res.status(200).json(
    new ApiResponse(
        true,
        "Documents fetched successfully",
        documents
    )
    );
  } catch (error) {
    next(error);
  }
};

const getDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document =
    await documentService.getDocumentById(
        id,
        req.user.id
    );

    return res.status(200).json(
    new ApiResponse(
        true,
        "Documents fetched successfully",
        document
    )
    );
  } catch (error) {
    next(error);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    const document =
      await documentService.updateDocument(id, req.body,req.user.id);

    return res.status(200).json(
    new ApiResponse(
        true,
        "Document updated successfully",
        document
    )
    );
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    await documentService.deleteDocument(id,req.user.id);

    return res.status(200).json(
    new ApiResponse(
        true,
        "Document deleted successfully",
        null
    )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDocument,
  getWorkspaceDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};