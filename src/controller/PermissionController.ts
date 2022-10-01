import {Request, Response} from "express";
import PermissionService from "../services/PermissionService";


class PermissionController {
    //get all roles
    static async getAllPermission(req: Request, res: Response){
        try{
            const allPermissions = await PermissionService.getAll();
            return res.status(200).json({
                message: "Our cool Permission book is okay!",
                data: allPermissions
            });
        }
        catch(err){
            return res.status(500).json({
                message: err
            });
        }
    }



    //get role by id
    static async getPermissionById(req: Request, res: Response){
        try{
            const permissionById = await PermissionService.getById(parseInt(req.params.id));
            return res.status(200).json({
                message: "Our Permission book!",
                data: permissionById
            });
        }
        catch(err){
            return res.status(500).json({
                message: err
            });
        }

    }

    //create role
    static async createPermission(req: Request, res: Response){
        try{
            const permissionCreated = await PermissionService.create(req.body);
            return res.status(200).json({
                message: "count yourself lucky",
                data: permissionCreated
            });
        }
        catch(err){
            return res.status(500).json({
                message: "This permission got here before you! " + err
            });
        }
    }


    //update role
    static async updatePermission(req: Request, res: Response){
        try {
            const permissionUpdated = await PermissionService.update(parseInt(req.params.id), req.body);
            return res.status(200).json({
                message: "I always gath you!",
                data: permissionUpdated
            });
        }
        catch(err) {
            return res.status(500).json({
                message: err
            });
        }
    }

    //delete role
    static async deletePermission(req: Request, res: Response){
        try{
            const permissionDeleted = await PermissionService.delete(parseInt(req.params.id));
            return res.status(200).json({
                message: "Sorry I gath let you go! "
            });
        }
        catch(err){
            return res.status(500).json({
                message: err
            });
        }
    }
}

export default PermissionController;