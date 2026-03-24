import db from '../config/db.js';


export const listUsersModel = async () => {
        const result = await db.query('SELECT id, name, email FROM users');
        return result.rows;
};

export const listSpecificUserModel = async (id) => {
        const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        return result.rows[0];
};

export const updateUserModel = async (id, fields) => {
    const keys = Object.keys(fields); // ['name'] or ['email'] or ['name', 'email']
    const values = Object.values(fields);
    
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    values.push(id);
    
    const result = await db.query(
        `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING id, name, email`,
        values
    );
    return result.rows[0];
};

export const deleteUserModel = async (id) => {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    return { message: 'User deleted successfully' };
};