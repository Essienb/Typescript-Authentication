import express from 'express';
import { DbConnection } from './db/DbConnection';
import router from "./routes/routes";



DbConnection();
const app = express();
app.use(express.json());
app.use(router);

export default app;