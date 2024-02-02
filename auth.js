const jwt = require('jsonwebtoken');

const generateAuthToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const authenticateUser = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        // Assuming you have similar utility functions defined locally for responses
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // Check if the token starts with "Bearer "
    if (token.startsWith('Bearer ')) {
        // Remove the "Bearer " prefix
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Assuming you have similar utility functions defined locally for responses
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};

module.exports = {
    generateAuthToken,
    authenticateUser,
};
