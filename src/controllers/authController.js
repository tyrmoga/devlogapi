import { registerUserModel, loginUserModel } from "../models/authModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// authController.js — catch and respond
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserModel(email, password);
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};

//registerController rewritten to catch and respond
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await registerUserModel(name, email, password);
        res.status(201).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};
