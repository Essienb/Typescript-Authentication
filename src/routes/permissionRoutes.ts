import { Router } from "express";
import PermissionController from "../controller/PermissionController";


const permissionRouter = Router();

permissionRouter.get('/permissions', PermissionController.getAllPermission);
permissionRouter.get('/permissions/:id', PermissionController.getPermissionById);
permissionRouter.post('/permissions', PermissionController.createPermission);
permissionRouter.put('/permissions/:id', PermissionController.updatePermission);
permissionRouter.delete('/permissions/:id', PermissionController.deletePermission);


export default permissionRouter;