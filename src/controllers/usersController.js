import { listUsersModel, listSpecificUserModel, updateUserModel,deleteUserModel } from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const listUsersController = async (req, res) => {
    try {
        const users = await listUsersModel();
        res.status(200).json({ status: 200, data: users });
    } catch (err) {
        console.error('Error in listUsersController:', err);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

export const listSpecificUserController = async (req, res) => {
    try {
         const user = await listSpecificUserModel(req.params.id);
                if (!user) {
                    return res.status(404).json({ status: 404, message: 'User not found' });
                }
                res.status(200).json({ status: 200, data: user });
            } catch (err) {
                console.error('Error in listSpecificUserController:', err);
                res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
            }     
};

export const updateUserController = async (req, res) => {   
    try {
                const updatedUser = await updateUserModel(req.params.id, req.body.name, req.body.email);
                if (!updatedUser) {
                    return res.status(404).json({ status: 404, message: 'User not found' });
                }
                res.status(200).json({ status: 200, data: updatedUser });
            } catch (err) {
                console.error('Error in updateUserController:', err);
                res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
            }
        };
   

export const deleteUserController = async (req, res) => {
    try {
                const result = await deleteUserModel(req.params.id);
                res.status(200).json(result);
            } catch (err) {
                console.error('Error in deleteUserController:', err);
                res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
            }
    };
 