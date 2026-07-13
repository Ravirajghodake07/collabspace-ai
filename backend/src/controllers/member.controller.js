const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
    inviteMemberService,getWorkspaceMembersService,updateMemberRoleService,removeMemberService,leaveWorkspaceService,
} = require("../services/member.service");

const inviteMember = asyncHandler(async (req, res) => {

    const member = await inviteMemberService(
        req.params.id,
        req.body.email
    );

    res.status(201).json(
        new ApiResponse(
            true,
            "Member invited successfully",
            member
        )
    );

});
const getWorkspaceMembers = asyncHandler(async (req, res) => {

    const members = await getWorkspaceMembersService(
        req.params.id
    );

    res.status(200).json(
        new ApiResponse(
            true,
            "Members fetched successfully",
            members
        )
    );

});
const updateMemberRole = asyncHandler(async (req, res) => {

    const member = await updateMemberRoleService(

        req.params.id,

        req.params.memberId,

        req.body.role

    );

    res.status(200).json(

        new ApiResponse(

            true,

            "Member role updated successfully",

            member

        )

    );

});
const removeMember = asyncHandler(async (req, res) => {

    await removeMemberService(

        req.params.id,

        req.params.memberId,

        req.user.id

    );

    res.status(200).json(

        new ApiResponse(

            true,

            "Member removed successfully"

        )

    );

});
const leaveWorkspace = asyncHandler(async (req, res) => {

    await leaveWorkspaceService(

        req.params.id,

        req.user.id

    );

    res.status(200).json(

        new ApiResponse(

            true,

            "Left workspace successfully"

        )

    );

});

module.exports = {
    inviteMember,getWorkspaceMembers,updateMemberRole,removeMember,leaveWorkspace,
};