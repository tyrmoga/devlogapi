import { registerUserModel, loginUserModel } from "../models/authModel.js";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUserModel(email, password);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        console.error('Error in loginController:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await registerUserModel(name, email, password);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        console.error('Error in registerController:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}