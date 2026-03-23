import { Router } from "express";
import { listUsersController,listSpecificUserController,updateUserController,deleteUserController } from "../controllers/usersController.js";

const usersRoute = Router();

usersRoute.get('/', listUsersController);

usersRoute.get('/:id', listSpecificUserController);

usersRoute.patch('/:id', updateUserController);

usersRoute.delete('/:id', deleteUserController);

export default usersRoute;

