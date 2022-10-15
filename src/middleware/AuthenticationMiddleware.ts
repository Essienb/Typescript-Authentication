import {Request, Response, NextFunction} from "express";
import RoleService from "../services/RoleService";
import "dotenv/config";
import jwt from "jsonwebtoken";


function authenticatingUserAccessToken(req:Request, res: Response, next: NextFunction){

    const accessToken = req.headers.authorization?.split(" ")[1];

    const secret = (process.env.JWT_SALT as string);

    //check if the access Token exist
    if(accessToken == null){
       return res.status(401).json({
            message: "You don't have an accessToken, so stay out!"
        });
    }

    //check if provided access Token isValid/active
    jwt.verify(accessToken, secret, (error, userInfoStored)=>{
        if(error){
            return res.status(403).json({
                message: "accessToken isNotValid , so stay out! " + error
            });
        }
        req.body.authUser = userInfoStored;
        next();
    });
}
export {authenticatingUserAccessToken};