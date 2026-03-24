import bcrypt from 'bcryptjs';
import { loginUserModel, registerUserModel } from '../models/authModel.js';

export const loginUserService = async (email, password) => {    
        const user = await loginUserModel(email);    
        if (!user) throw { status: 401, message: 'Invalid email or password' };         
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw { status: 401, message: 'Invalid email or password' };
        return { id: user.id, name: user.name, email: user.email };
};

export const registerUserService = async (name, email, password) => {
    const existing = await loginUserModel(email);
    if (existing) throw { status: 409, message: 'Email already in use' };
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await registerUserModel(name, email, hashedPassword);
    if (!newUser) throw { status: 500, message: 'Failed to create user' };
    return newUser;
};
    
