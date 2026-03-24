import db from '../config/db.js';


export const listUsersModel = async () => {
        const result = await db.query('SELECT id, name, email FROM users');
        return result.rows;
};

export const listSpecificUserModel = async (id) => {
        const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        return result.rows[0];
};

export const updateUserModel = async (id, name, email) => {
    const result = await db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
        [name, email, id]
    );
    return result.rows[0];
};

export const deleteUserModel = async (id) => {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    return { message: 'User deleted successfully' };
};