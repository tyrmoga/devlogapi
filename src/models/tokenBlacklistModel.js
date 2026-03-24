export const blacklistToken = async (token, expiresAt) => {
    await db.query(
        'INSERT INTO token_blacklist (token, expires_at) VALUES ($1, $2)',
        [token, expiresAt]
    );
};

export const isTokenBlacklisted = async (token) => {
    const result = await db.query(
        'SELECT 1 FROM token_blacklist WHERE token = $1 AND expires_at > NOW()',
        [token]
    );
    return result.rowCount > 0;
};