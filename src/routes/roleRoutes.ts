import { Router } from "express";
import RoleController from "../controller/RoleController";
import {authenticatingUserAccessToken} from "../middleware/AuthenticationMiddleware";
import {hasPermission} from "../middleware/AuthorizationMiddleware";

const router = Router();


//Routes for Roles
router.post('/roles',  RoleController.createRole);
 router.get('/roles', authenticatingUserAccessToken, hasPermission('delete-user'), RoleController.getAllRoles);
// router.get('/roles', hasPermission('delete-user'), RoleController.getAllRoles);
router.get('/roles/:id', RoleController.getRoleId);
router.put('/roles/:id', RoleController.updateRole);
router.delete('/roles/:id', RoleController.deleteRole);
router.post('/roles/permissions/:id', RoleController.addPermToRole);
router.delete('/roles/permissions/:id', RoleController.deletePermFromRole);

// router.get('/', function(req, res){


// })


export default router;