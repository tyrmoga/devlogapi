import { Router } from "express";

const authRoute = Router();

//dummy auth routes for testing
authRoute.post('/register', (req, res) => {
    res.status(200).send(' You have found the Register route');
});

authRoute.post('/login', (req, res) => {
    res.status(200).send(' You have found the Login route');
});

export default authRoute;