import db from '../config/db.js';

//create a new project and update project_members in the same transaction
export const createProjectModel = async (name, description, ownerId) => {
    const result = await db.query(
        'WITH new_project AS (INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *) \
        INSERT INTO project_members (project_id, user_id, role) SELECT id, owner_id, \'owner\' FROM new_project RETURNING *',
        [name, description, ownerId]
    );
    return result.rows[0];
};

//get my projects
export const getMyProjectsModel = async (ownerId) => {
    const result = await db.query(
        'SELECT * FROM projects WHERE owner_id = $1',
        [ownerId]
    );
    return result.rows;
};

//get projects i'm a member of
export const getMemberProjectsModel = async (userId) => {
    const result = await db.query(
    `SELECT p.* FROM projects p
    JOIN project_members pm ON p.id = pm.project_id
    WHERE pm.user_id = $1`,
    [userId]
    );
    return result.rows;
};

//update project details
export const updateProjectModel = async(projectId, fields) => {
    const keys = Object.keys(fields); // ['name'] or ['description'] or ['name', 'description']
    const values = Object.values(fields);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    values.push(projectId);
    const result = await db.query(
        `UPDATE projects SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

//delete a project
export const deleteProjectModel = async (projectId) => {
    const result = await db.query('DELETE FROM projects WHERE id = $1', [projectId]);    
    return result.rowCount > 0;
};