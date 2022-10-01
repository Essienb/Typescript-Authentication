import {Request, Response, NextFunction} from "express";
import RoleService from "../services/RoleService";


function hasPermission(permission: String){

    return async (req: Request, res: Response, next: NextFunction) => {
    const roleObject: any = await RoleService.getById(req.body.authUser.roleId);

    //to get the permissions assigned to each role
    const permissions = roleObject?.Permissions;

    let check = false;
    for(let i = 0; i<permissions.length; i++) {
        if (permission === permissions[i].slug) check = true;
    }
        if(check === false){
            return res.status(401).json({
                message: "You are trying to get caught"
            });
        }
        next();
    }
}
export {hasPermission};