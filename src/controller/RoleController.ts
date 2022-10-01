import RoleService from "../services/RoleService";
import {Request, Response} from "express";


class RoleController {
    //get all roles
    static async getAllRoles(req: Request, res: Response) {
        try {
            const allRoles = await RoleService.getAll();
            return res.status(200).json({
                message: "Our Roles book!",
                data: allRoles
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }


    //get role by id
    static async getRoleId(req: Request, res: Response) {
        try {
            const rolesById = await RoleService.getById(parseInt(req.params.id));
            return res.status(200).json({
                message: "Our Roles book!",
                data: rolesById
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }

    }

    //create role
    static async createRole(req: Request, res: Response) {
        try {
            const roleCreated = await RoleService.create(req.body);
            return res.status(200).json({
                message: "count yourself lucky",
                data: roleCreated
            });
        } catch (err) {
            return res.status(500).json({
                message: "This role got here before you! " + err
            });
        }
    }


    //update role
    static async updateRole(req: Request, res: Response) {
        try {
            const roleUpdated = await RoleService.update(parseInt(req.params.id), req.body);
            return res.status(200).json({
                message: "I always gath you!",
                data: roleUpdated
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }

    //delete role
    static async deleteRole(req: Request, res: Response) {
        try {
            const roleDeleted = await RoleService.delete(parseInt(req.params.id));
            return res.status(200).json({
                message: "Sorry I gath to let you go! "
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }

    //Add Permission to Role
    static async addPermToRole(req: Request, res: Response) {
        try {
            const permAddedToRole = await RoleService.addPermissions(parseInt(req.params.id), req.body)
            return res.status(200).json({
                message: "Permission is right where it belongs! "
            });

        } catch (err) {
            return res.status(500).json({
                message: "Sorry! We want only Roles best for you"
            });
        }
    }

    static async deletePermFromRole(req: Request, res: Response) {
        try {
            const permRemovedFromRole = await RoleService.deletePermissions(parseInt(req.params.id), req.body)
            return res.status(200).json({
                message: "Permission has been burned to ashes! "
            });

        } catch (err) {
            return res.status(500).json({
                message: "Sorry! We need our Role free of you!"
            });
        }
    }
}

export default RoleController;
