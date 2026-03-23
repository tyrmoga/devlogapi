import bcrypt from 'bcryptjs';
import { loginUserModel, registerUserModel } from '../models/authModel.js';

export const loginUserService = async (email, password) => {    
        const user = await loginUserModel(email, password);    
        if (!user) throw { status: 401, message: 'Invalid email or password' };         
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw { status: 401, message: 'Invalid email or password' };
        return { id: user.id, name: user.name, email: user.email };
};

export const registerUserService = async (name, email, password) => {    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await registerUserModel(name, email, hashedPassword);
    if (!newUser) throw { status: 500, message: 'Failed to register user' };
    return newUser;
};
    
