import db from '../config/db.js';

// deal only with database interactions related to authentication, such as fetching user by email and creating new user records
export const loginUserModel = async (email, password) => {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('Login user result:', userResult);
    return userResult.rows[0];
};


export const registerUserModel = async (name, email, password) => {
    const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING id, name, email',
        [name, email, password]
    );
    console.log('Register user result:', result);
    return result.rows[0];
};

