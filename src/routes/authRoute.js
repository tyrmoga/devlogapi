import { Router } from "express";
import { validateLogin, validateRegister } from "../middleware/inputValidation.js";
import { loginController, registerController } from "../controllers/authController.js";


const authRoute = Router();

authRoute.post('/register', validateRegister, registerController);

authRoute.post('/login', validateLogin, loginController);

export default authRoute;