import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const registerUserModel = async (name, email, password) => {
    try {
        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rowCount > 0) {
            return { success: false, message: 'Email already registered' };
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user into database
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING id, name, email',
            [name, email, hashedPassword]
        );
        return { success: true, message: 'User registered successfully'};
    } catch (err) {
        console.error('Error registering user:', err);
        return { success: false, message: 'Registration failed' };
    }
};
export const loginUserModel = async (email, password) => {
    try {
        // Check if user exists
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rowCount === 0) {
            return { success: false, message: 'Invalid email or password' };
        }
        const user = userResult.rows[0];
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid email or password' };
        }
        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
    } catch (err) {
        console.error('Error logging in user:', err);
        return { success: false, message: 'Login failed' };
    }
};