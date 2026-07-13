const prisma = require("../config/prisma");

const findUserByEmail = async (email) => {

    return prisma.user.findUnique({
        where: {
            email,
        },
    });

};

const findWorkspaceMember = async (workspaceId, userId) => {

    return prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId,
            },
        },
    });

};

const addWorkspaceMember = async (workspaceId, userId) => {

    return prisma.workspaceMember.create({
        data: {
            workspaceId,
            userId,
            role: "MEMBER",
        },
    });

};
const getWorkspaceMembers = async (workspaceId) => {
    return prisma.workspaceMember.findMany({
        where: {
            workspaceId,
        },
        select: {
            id: true,
            role: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};
const getMemberById = async (memberId) => {

    return prisma.workspaceMember.findUnique({

        where: {
            id: memberId,
        },

    });

};

const updateMemberRole = async (memberId, role) => {

    return prisma.workspaceMember.update({

        where: {
            id: memberId,
        },

        data: {
            role,
        },

    });

};
const removeMember = async (memberId) => {
    return prisma.workspaceMember.delete({
        where: {
            id: memberId,
        },
    });
};

module.exports = {
    findUserByEmail,
    findWorkspaceMember,
    addWorkspaceMember,getWorkspaceMembers,getMemberById,updateMemberRole,
    removeMember,
};