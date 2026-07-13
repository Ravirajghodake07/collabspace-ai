const asyncHandler = require("../utils/asyncHandler");

const {
    createWorkspaceService,getUserWorkspacesService,getWorkspaceByIdService,updateWorkspaceService,deleteWorkspaceService,
} = require("../services/workspace.service");
const ApiResponse = require("../utils/ApiResponse");
const createWorkspace = asyncHandler(async (req, res) => {

    const workspace = await createWorkspaceService(
        req.user.id,
        req.body
    );

    res.status(201).json(
    new ApiResponse(
        true,
        "Workspace created successfully",
        workspace
    )
);

});
const getUserWorkspaces = asyncHandler(async (req, res) => {

    const workspaces = await getUserWorkspacesService(req.user.id);

    res.status(200).json(
    new ApiResponse(
        true,
        "Workspaces fetched successfully",
        workspaces
    )
);

});
const getWorkspaceById = asyncHandler(async (req, res) => {

    const workspace = await getWorkspaceByIdService(
        req.params.id
    );

    res.status(200).json(
    new ApiResponse(
        true,
        "Workspace fetched successfully",
        workspace
    )
);

});
const updateWorkspace = asyncHandler(async (req, res) => {

    const workspace = await updateWorkspaceService(

        req.params.id,

        req.body

    );

    res.status(200).json(
    new ApiResponse(
        true,
        "Workspace updated successfully",
        workspace
    )
);

});
const deleteWorkspace = asyncHandler(async (req, res) => {

    await deleteWorkspaceService(req.params.id);

    res.status(200).json(
    new ApiResponse(
        true,
        "Workspace deleted successfully"
    )
);

});

module.exports = {
    createWorkspace,getUserWorkspaces,getWorkspaceById,updateWorkspace,deleteWorkspace,
};