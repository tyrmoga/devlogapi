import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import { checkDbConnection } from './src/config/db.js';

//initialize dotenv, app and port
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//initialize middlewares
app.use(express.json()); //for parsing application/json
app.use(cors()); //permissive CORS policy, can be configured later
app.use(compression()); //gzip compression for responses, can be configured later

//define routes 


//check db connection 
checkDbConnection(); 

//start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
