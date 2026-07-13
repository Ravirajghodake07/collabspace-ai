const prisma = require("../config/prisma");
const { getUserWorkspaces,getWorkspaceById ,updateWorkspace,deleteWorkspace} = require("../repositories/workspace.repository");

const createWorkspaceService = async (userId, workspaceData) => {

    return await prisma.$transaction(async (tx) => {

        const workspace = await tx.workspace.create({
            data: {
                name: workspaceData.name,
                description: workspaceData.description,
            },
        });

        await tx.workspaceMember.create({
            data: {
                userId,
                workspaceId: workspace.id,
                role: "OWNER",
            },
        });

        return workspace;

    });

};
const getUserWorkspacesService = async (userId) => {

    const memberships = await getUserWorkspaces(userId);

    return memberships.map((membership) => ({
        role: membership.role,
        ...membership.workspace,
    }));

};
const getWorkspaceByIdService = async (workspaceId) => {

    return await getWorkspaceById(workspaceId);

};
const updateWorkspaceService = async (
    workspaceId,
    data
) => {

    return await updateWorkspace(
        workspaceId,
        data
    );

};
const deleteWorkspaceService = async (workspaceId) => {

    return await deleteWorkspace(workspaceId);

};

module.exports = {
    createWorkspaceService,getUserWorkspacesService,getWorkspaceByIdService,updateWorkspaceService,deleteWorkspaceService,
};