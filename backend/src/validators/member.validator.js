const { z } = require("zod");

const inviteMemberSchema = z.object({
    email: z.string().email(),
});
const updateMemberRoleSchema = z.object({
    role: z.enum(["ADMIN", "MEMBER"]),
});

module.exports = {
    inviteMemberSchema,updateMemberRoleSchema,
};