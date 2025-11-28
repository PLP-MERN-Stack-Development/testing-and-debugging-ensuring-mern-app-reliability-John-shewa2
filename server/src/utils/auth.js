const generateToken = (user) => {
    return `fake-jwt-token-for-${user._id}`;
};

module.exports = { generateToken };