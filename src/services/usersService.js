import { listUsersModel, listSpecificUserModel, updateUserModel, deleteUserModel } from '../models/usersModel.js';

export const listUsersService = async () => {
    const users = await listUsersModel();
    return users;
};

export const listSpecificUserService = async (id) => {
    const user = await listSpecificUserModel(id);
    return user;
};

export const updateUserService = async (requestingUserId, id, name, email) => {
    const thisUser = await listSpecificUserModel(id);
    if (!thisUser) throw { status: 404, message: 'User not found' };
    if (thisUser.id !== requestingUserId) throw { status: 403, message: 'Forbidden: You can only update your own profile' };
    return await updateUserModel(id, name, email);
};

export const deleteUserService = async (requestingUserId, id) => {
    const thisUser = await listSpecificUserModel(id);
    if (!thisUser) throw { status: 404, message: 'User not found' };
    if (thisUser.id !== requestingUserId) throw { status: 403, message: 'Forbidden: You can only delete your own profile' };
    const deletedUser = await deleteUserModel(id);
    return deletedUser;
};