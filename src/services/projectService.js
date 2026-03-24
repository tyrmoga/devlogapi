import { createProjectModel, listProjectsModel, listSpecificProjectModel, updateProjectModel, deleteProjectModel } from '../models/projectModel.js';

export const createProjectService = async (name, description, ownerId) => {
    const newProject = await createProjectModel(name, description, ownerId);
    if (!newProject) throw { status: 500, message: 'Failed to create project' };
    return newProject;
}