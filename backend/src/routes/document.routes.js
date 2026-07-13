const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const validateMiddleware = require("../middlewares/validate.middleware");

const {
  createDocumentSchema,
  updateDocumentSchema,
} = require("../validators/document.validator");

const {
  createDocument,
  getWorkspaceDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../controllers/document.controller");

// Create Document
router.post(
  "/workspaces/:workspaceId/documents",
  authMiddleware,
  validateMiddleware(createDocumentSchema),
  createDocument
);

// Get Workspace Documents
router.get(
  "/workspaces/:workspaceId/documents",
  authMiddleware,
  getWorkspaceDocuments
);

// Get Document
router.get(
  "/:id",
  authMiddleware,
  getDocumentById
);

// Update Document
router.put(
  "/:id",
  authMiddleware,
  validateMiddleware(updateDocumentSchema),
  updateDocument
);

// Delete Document
router.delete(
  "/:id",
  authMiddleware,
  deleteDocument
);

module.exports = router;