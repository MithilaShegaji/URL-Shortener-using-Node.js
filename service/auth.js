const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "mith$1234@$";

function setUser(user) {
    // Sign the JWT with the user's ID and email
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        // Verify the JWT using the same secret
        return jwt.verify(token, secret);
    } catch (err) {
        // console.error("JWT verification error:", err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
