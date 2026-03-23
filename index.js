
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { checkDbConnection, initSchema } from './src/config/db.js';
import authRoute from './src/routes/authRoute.js';
import usersRoute from './src/routes/usersRoute.js';

//initialize dotenv, app and port
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//initialize middlewares
app.use(express.json()); //for parsing application/json
app.use(cors()); //permissive CORS policy, can be configured later
app.use(compression()); //gzip compression for responses, can be configured later

//define routes 
//1. home route
app.get('/', (req, res) => {
  res.send('Welcome to the DevLog API!');
});
//2. auth routes

app.use('/api/auth', authRoute);

//3. user routes
app.use('/api/users', usersRoute);



//start the server and initialize database connection and schemas
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await checkDbConnection();
  await initSchema();
});
