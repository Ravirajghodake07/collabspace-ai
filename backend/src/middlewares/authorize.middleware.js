const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const authorize = (allowedRoles) => {

    return async (req, res, next) => {

        const workspaceId = req.params.id;

        const userId = req.user.id;

        const membership = await prisma.workspaceMember.findUnique({

            where: {

                userId_workspaceId: {

                    userId,

                    workspaceId,

                },

            },

        });
        
        if (!membership) {

            return next(

                new AppError("You are not a member of this workspace", 403)

            );

        }

        if (!allowedRoles.includes(membership.role)) {

            return next(

                new AppError("Access denied", 403)

            );

        }

        req.membership = membership;

        next();

    };

};

module.exports = authorize;