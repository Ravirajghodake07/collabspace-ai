const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const {
    findUserByEmail,
    createUser,
} = require("../repositories/user.repository");

const generateToken = require("../utils/generateToken");

const registerUser = async (userData) => {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await createUser({
        ...userData,
        password: hashedPassword,
    });

    const token = generateToken(user.id);

    const { password, ...safeUser } = user;

    return {
        user: safeUser,
        token,
    };
};
const loginUser = async ({ email, password }) => {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    const { password: pwd, ...safeUser } = user;

    return {
        user: safeUser,
        token,
    };
};
module.exports = {
    registerUser,
    loginUser,
};