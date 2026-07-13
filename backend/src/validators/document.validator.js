const { z } = require("zod");

const createDocumentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
});

const updateDocumentSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .optional(),

  content: z
    .string()
    .optional(),
});

module.exports = {
  createDocumentSchema,
  updateDocumentSchema,
};