import { registerUserModel, loginUserModel } from "../models/authModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUserModel(email, password);
        if (result.status === 200) {
            const token = jwt.sign({ id: result.user.id, name: result.user.name, email: result.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ ...result, token });
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        console.error('Error in loginController:', err);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await registerUserModel(name, email, password);
        if (result.status === 201) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        console.error('Error in registerController:', err);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}