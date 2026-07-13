const { z } = require("zod");

const createWorkspaceSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
});

module.exports = {
    createWorkspaceSchema,
};