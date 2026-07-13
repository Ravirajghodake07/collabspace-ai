const express = require("express");

const router = express.Router({ mergeParams: true });

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");

const {
    inviteMember,getWorkspaceMembers,updateMemberRole,removeMember,leaveWorkspace,
} = require("../controllers/member.controller");
const validate = require("../middlewares/validate.middleware");

const {
    inviteMemberSchema,updateMemberRoleSchema,
} = require("../validators/member.validator");
router.post(
    "/",
    authMiddleware,
    authorize(["OWNER", "ADMIN"]),
    validate(inviteMemberSchema),
    inviteMember
);
router.get(
    "/",
    authMiddleware,
    getWorkspaceMembers
);
router.patch(
    "/:memberId",

    authMiddleware,

    authorize(["OWNER"]),

    validate(updateMemberRoleSchema),

    updateMemberRole
);
router.delete(

    "/leave",

    authMiddleware,

    leaveWorkspace

);
router.delete(
    "/:memberId",

    authMiddleware,

    authorize(["OWNER"]),

    removeMember
);


module.exports = router;