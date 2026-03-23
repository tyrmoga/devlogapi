import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const listUsersModel = async () => {
    try {
        const result = await db.query('SELECT id, name, email FROM users');
        return result.rows;
    } catch (err) {
        console.error('Error in listUsersModel:', err);
        throw err;
    }
};

export const listSpecificUserModel = async (id) => {
    try {
        const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error in listSpecificUserModel:', err);
        throw err;
    }
};

export const updateUserModel = async (id, name, email) => {
    try {
        const result = await db.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [name, email, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error in updateUserModel:', err);
        throw err;
    }
};

export const deleteUserModel = async (id) => {
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        return { success: true, message: 'User deleted successfully' };
    }
    catch (err) {
        console.error('Error in deleteUserModel:', err);
        throw err;
    }
};