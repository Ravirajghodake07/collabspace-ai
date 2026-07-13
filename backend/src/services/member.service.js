const AppError = require("../utils/AppError");

const {
    findUserByEmail,
    findWorkspaceMember,
    addWorkspaceMember,
    getWorkspaceMembers,getMemberById,updateMemberRole,removeMember,
} = require("../repositories/member.repository");

const inviteMemberService = async (workspaceId, email) => {

    // Check if user exists
    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Check if already a member
    const existingMember = await findWorkspaceMember(
        workspaceId,
        user.id
    );

    if (existingMember) {
        throw new AppError("User is already a member", 409);
    }

    // Add member
    const member = await addWorkspaceMember(
        workspaceId,
        user.id
    );

    return member;
};
const getWorkspaceMembersService = async (workspaceId) => {

    return await getWorkspaceMembers(workspaceId);

};
const updateMemberRoleService = async (
    workspaceId,
    memberId,
    role
) => {

    const member = await getMemberById(memberId);

    if (!member) {
        throw new AppError("Member not found", 404);
    }

    // Make sure the member belongs to this workspace
    if (member.workspaceId !== workspaceId) {
        throw new AppError("Invalid workspace member", 400);
    }

    // Prevent changing OWNER role
    if (member.role === "OWNER") {
        throw new AppError(
            "Owner role cannot be changed",
            403
        );
    }

    return await updateMemberRole(memberId, role);

};
const removeMemberService = async (
    workspaceId,
    memberId,
    currentUserId
) => {

    const member = await getMemberById(memberId);

    if (!member) {
        throw new AppError("Member not found", 404);
    }

    // Check if member belongs to this workspace
    if (member.workspaceId !== workspaceId) {
        throw new AppError("Invalid workspace member", 400);
    }

    // Prevent removing OWNER
    if (member.role === "OWNER") {
        throw new AppError("Owner cannot be removed", 403);
    }

    // Prevent owner removing themselves through this API
    if (member.userId === currentUserId) {
        throw new AppError(
            "Use Leave Workspace API instead",
            400
        );
    }

    await removeMember(memberId);

};
const leaveWorkspaceService = async (
    workspaceId,
    userId
) => {

    const member = await findWorkspaceMember(
        workspaceId,
        userId
    );

    if (!member) {
        throw new AppError(
            "You are not a member of this workspace",
            404
        );
    }

    if (member.role === "OWNER") {
        throw new AppError(
            "Owner cannot leave the workspace",
            403
        );
    }

    await removeMember(member.id);

};

module.exports = {
    inviteMemberService,getWorkspaceMembersService,updateMemberRoleService,removeMemberService,leaveWorkspaceService,
};