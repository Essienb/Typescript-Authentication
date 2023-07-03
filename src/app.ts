import express, {Request, Response, NextFunction} from 'express';
import {DbConnection} from './db/DbConnection';
import router from "./routes/routes";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';


DbConnection().then(r => console.log("connected to db"));
const app = express();
// Add Access Control Allow Origin headers
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);


//how to handle unavailable routes
app.use((req: Request, res: Response, next: NextFunction) => {
    const errorHandler = {
        message: "resource not found",
        status: 404
    }

    next(errorHandler);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json(error);
});
// Adding Access Control Allow Origin headers as a middleware
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
// //     next();
//  });
export default app;