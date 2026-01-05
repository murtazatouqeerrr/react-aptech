const jwt = require("jsonwebtoken");
const User = require("../models/auth-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(400).json({ msg: "Unauthorized HTTP, Token not provided" });
    }

    console.log(token);
    const jwToken = token.replace("Bearer", "").trim();
    console.log(jwToken);

    try {
        const isVerified = jwt.verify(jwToken, "murtaza");
        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
        console.log(userData);
        req.user = userData;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;