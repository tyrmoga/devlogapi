import { Router } from "express";
import { listUsersController,listMeController,updateMeController,deleteMeController } from "../controllers/usersController.js";
import jwtTokenChecker from "../middleware/jwtSessionChecker.js";    

const usersRoute = Router();

usersRoute.get('/', jwtTokenChecker, listUsersController);

usersRoute.get('/me', jwtTokenChecker, listMeController);

usersRoute.patch('/me', jwtTokenChecker, updateMeController);

usersRoute.delete('/me', jwtTokenChecker, deleteMeController);

export default usersRoute;

