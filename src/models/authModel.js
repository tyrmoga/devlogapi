import db from '../config/db.js';
import bcrypt from 'bcryptjs';


// authModel.js — throw on failure
export const loginUserModel = async (email, password) => {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rowCount === 0) throw { status: 401, message: 'Invalid email or password' };
    
    const isMatch = await bcrypt.compare(password, userResult.rows[0].password);
    if (!isMatch) throw { status: 401, message: 'Invalid email or password' };
    
    return userResult.rows[0];
};

//registermodel rewritten  to throw errors
export const registerUserModel = async (name, email, password) => {
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rowCount > 0) throw { status: 400, message: 'Email already exists' };
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
    );
    if (result.rowCount === 0) throw { status: 500, message: 'Failed to register user' };

    return result.rows[0];
};

