import http from 'http';
import 'dotenv/config';
import app from './src/app';


const PORT:number = parseInt(process.env.PORT as string) || 5002;

http.createServer(app).listen(PORT, function(){console.log("Server running successfully on Port " + PORT)});