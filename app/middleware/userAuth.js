import {config} from 'dotenv';
import jwt from 'jsonwebtoken';
config();

const auth = async (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token)
        return res.status(401).json({
            message: "Invalid Token"
        });
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data._id;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }

}

export default auth;