const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");

const AppError = require("../utils/AppError");

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return next(
            new AppError("Unauthorized",401)
        );

    }

    const token = authHeader.split(" ")[1];

    try{

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({

            where:{
                id:decoded.id
            }

        });

        if(!user){

            return next(
                new AppError("User not found",404)
            );

        }

        req.user=user;

        next();

    }

    catch(error){

        next(
            new AppError("Invalid Token",401)
        );

    }

};

module.exports=authMiddleware;