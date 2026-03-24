import { listUsersService, listMeService, updateUserService,deleteUserService } from '../services/usersService.js';



export const listUsersController = async (req, res) => {
    try {
        const users = await listUsersService();
        res.status(200).json({ status: 200, data: users });
    } catch (err) {
        console.error('An error occcured in listUsersController:', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};

export const listMeController = async (req, res) => {
    try {
        const user = await listMeService(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        res.status(200).json({ status: 200, data: user });
    } catch (err) {
        console.error('Error in listMeController:', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};


export const updateMeController = async (req, res) => {
    try {
        const updatedUser = await updateUserService(req.user.id, req.user.id, req.body);
        res.status(200).json({ status: 200, data: updatedUser });
    } catch (err) {
        console.error('An error occurred in updateMeController:', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};


export const deleteMeController = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const result = await deleteUserService(req.user.id, token);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};
 