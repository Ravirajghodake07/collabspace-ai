const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
    createWorkspace,getUserWorkspaces,getWorkspaceById,updateWorkspace,deleteWorkspace,
} = require("../controllers/workspace.controller");
const authorize = require("../middlewares/authorize.middleware");
const memberRoutes = require("./member.routes");
router.post(
    "/",
    authMiddleware,
    createWorkspace
);
router.get(
    "/",
    authMiddleware,
    getUserWorkspaces
);
router.use(
    "/:id/members",
     memberRoutes
);
router.get(
    "/:id",
    authMiddleware,
    authorize(["OWNER", "ADMIN", "MEMBER"]),
    getWorkspaceById
);
router.patch(
    "/:id",
    authMiddleware,
    authorize(["OWNER", "ADMIN"]),
    updateWorkspace
);
router.delete(

    "/:id",

    authMiddleware,

    authorize(["OWNER"]),

    deleteWorkspace

);

module.exports = router;