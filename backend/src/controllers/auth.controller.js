const asyncHandler = require("../utils/asyncHandler");

const { registerUser,loginUser, } = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");
const register = asyncHandler(async (req, res) => {

    const result = await registerUser(req.body);

    res.status(201).json(
    new ApiResponse(
        true,
        "User registered successfully",
        result
    )
);

});
const login = asyncHandler(async (req, res) => {

    const result = await loginUser(req.body);

    res.status(200).json(
    new ApiResponse(
        true,
        "Login successful",
        result
    )
);

});
const getMe = asyncHandler(async(req,res)=>{

    res.status(200).json({

        success:true,

        data:req.user

    });

});

module.exports = {
    register,
    login,
    getMe,
};