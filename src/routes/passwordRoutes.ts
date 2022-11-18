import {response, Router} from "express";
import PasswordController from "../controller/PasswordController";


const passwordRouter = Router();


passwordRouter.post('/forgotpassword', PasswordController.forgotPassword);
passwordRouter.post('/resetpassword', PasswordController.resetPassword);
// passwordRouter.post('/permissions', PermissionController.createPermission);
// passwordRouter.put('/permissions/:id', PermissionController.updatePermission);
// passwordRouter.delete('/permissions/:id', PermissionController.deletePermission);


export default passwordRouter;