import jwt from 'jsonwebtoken';
import { loginUserService, registerUserService } from "../services/authService.js";


// authController.js — catch and respond
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ status: 200, data: { token } });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};

//registerController rewritten to catch and respond
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await registerUserService(name, email, password);
        res.status(201).json({ status: 201, data: result });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};
