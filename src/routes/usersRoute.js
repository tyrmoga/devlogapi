import { Router } from "express";
import { listUsersController,listSpecificUserController,updateUserController,deleteUserController } from "../controllers/usersController.js";
import jwtTokenChecker from "../middleware/jwtSessionChecker.js";    

const usersRoute = Router();

usersRoute.get('/', jwtTokenChecker, listUsersController);

usersRoute.get('/:id', jwtTokenChecker, listSpecificUserController);

usersRoute.patch('/:id', jwtTokenChecker, updateUserController);

usersRoute.delete('/:id', jwtTokenChecker, deleteUserController);

export default usersRoute;

