import db from '../config/db.js';

// deal only with database interactions related to authentication, such as fetching user by email and creating new user records
export const loginUserModel = async (email) => {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return userResult.rows[0];
};


export const registerUserModel = async (name, email, password) => {
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rowCount > 0) throw { status: 409, message: 'Email already in use' };

    const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, password]
    );
    return result.rows[0];
};

