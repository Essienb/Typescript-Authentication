import express, {Request,Response,NextFunction} from 'express';
import { DbConnection } from './db/DbConnection';
import router from "./routes/routes";




DbConnection();
const app = express();
app.use(express.json());
app.use(router);

//how to handle unavailable routes
app.use((req:Request,  res:Response, next: NextFunction) => {
    const errorHandler = {
        message: "resource not found",
        status: 404
    }

    next(errorHandler);
});

app.use(( error: any, req:Request,  res:Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json(error);
});




export default app;