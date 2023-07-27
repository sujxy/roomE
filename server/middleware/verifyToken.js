import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res) => {
    try {
        
    }
    catch (err) {
        res.status(400).json({error : err.message});
    }
}