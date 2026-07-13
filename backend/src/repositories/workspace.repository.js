const prisma = require("../config/prisma");


const getUserWorkspaces = async (userId) => {
    return prisma.workspaceMember.findMany({
        where: {
            userId,
        },
        include: {
            workspace: true,
        },
    });
};
const getWorkspaceById = async (workspaceId) => {
    return prisma.workspace.findUnique({

        where: {
            id: workspaceId,
        },

    });

};
const updateWorkspace = async (workspaceId, data) => {

    return prisma.workspace.update({

        where: {
            id: workspaceId,
        },

        data,

    });

};
const deleteWorkspace = async (workspaceId) => {

    return prisma.workspace.delete({

        where: {

            id: workspaceId,

        },

    });

};

module.exports = {
    getUserWorkspaces,getWorkspaceById,updateWorkspace,deleteWorkspace,
};