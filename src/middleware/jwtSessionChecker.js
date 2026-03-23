import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtTokenChecker = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Session Expired. Please log in again.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object for downstream use
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    } 
};

export default jwtTokenChecker;