import { listUsersService, listSpecificService, updateUserService,deleteUserService } from '../services/usersService.js';



export const listUsersController = async (req, res) => {
    try {
        const users = await listUsersService();
        res.status(200).json({ status: 200, data: users });
    } catch (err) {
        console.error('An error occcured in listUsersController:', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};


// export const listSpecificUserController = async (req, res) => {
//     try {
//          const user = await listSpecificUserModel(req.params.id);
//                 if (!user) {
//                     return res.status(404).json({ status: 404, message: 'User not found' });
//                 }
//                 res.status(200).json({ status: 200, data: user });
//             } catch (err) {
//                 console.error('Error in listSpecificUserController:', err);
//                 res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
//             }     
// };

export const listSpecificUserController = async (req, res) => {
    try {
        const user = await listSpecificService(req.params.id);
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
        const updatedUser = await updateUserService(req.user.id, req.params.id, req.body.name, req.body.email);
        res.status(200).json({ status: 200, data: updatedUser });
    } catch (err) {
        console.error('An error occurred in updateUserController:', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};


export const deleteUserController = async (req, res) => {
    try {
        const result = await deleteUserService(req.user.id, req.params.id);
        res.status(200).json(result);
    }catch (err) {
        console.error('Error in deleteUserController:', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
};
 