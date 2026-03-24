import { listUsersModel, listSpecificUserModel, updateUserModel, deleteUserModel } from '../models/usersModel.js';

export const listUsersService = async () => {
    const users = await listUsersModel();
    return users;
};

export const listMeService = async (id) => {
    const user = await listSpecificUserModel(id);
    return user;
};

export const updateUserService = async (requestingUserId, id, fields) => {
    const thisUser = await listSpecificUserModel(id);
    if (!thisUser) throw { status: 404, message: 'User not found' };
    if (thisUser.id !== requestingUserId) throw { status: 403, message: 'Forbidden: You can only update your own profile' };

    //whitelist only allowed fields to prevent mass assignment
    const allowedFields = ['name', 'email'];
    const sanitizedFields = Object.keys(fields)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = fields[key];
            return obj;
        }, {});

    if (Object.keys(sanitizedFields).length === 0) {
        throw { status: 400, message: 'No valid fields to update' };
    }
    return await updateUserModel(id, sanitizedFields);
};

export const deleteUserService = async (requestingUserId, id) => {
    const thisUser = await listSpecificUserModel(id);
    if (!thisUser) throw { status: 404, message: 'User not found' };
    if (thisUser.id !== requestingUserId) throw { status: 403, message: 'Forbidden: You can only delete your own profile' };
    const deletedUser = await deleteUserModel(id);
    return deletedUser;
};