const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: 'Authorization header missing, Access denied' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided, Access denied' });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Decoded User:", req.user);

        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Invalid user role, Access denied' });
        }

        next();
    } catch (err) {
        console.error("Token Verification Error:", err);
        res.status(401).json({ message: 'Invalid token, Access denied' });
    }
};

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access restricted to admins only' });
    }
    next();
};

const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== 'user') {
        return res.status(403).json({ message: 'Access restricted to users only' });
    }
    next();
};

module.exports = { verifyToken, isAdmin, isUser };
