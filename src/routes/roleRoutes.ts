import {response, Router} from "express";
import RoleController from "../controller/RoleController";
import {authenticatingUserAccessToken} from "../middleware/AuthenticationMiddleware";
import {hasPermission} from "../middleware/AuthorizationMiddleware";

const router = Router();


//Routes for Roles
router.post('/roles', authenticatingUserAccessToken, RoleController.createRole);
router.get('/roles', authenticatingUserAccessToken, RoleController.getAllRoles);
// router.get('/roles', hasPermission('delete-user'), RoleController.getAllRoles);
router.get('/roles/:id', authenticatingUserAccessToken, RoleController.getRoleId);
router.put('/roles/:id', authenticatingUserAccessToken, RoleController.updateRole);
router.delete('/roles/:id', authenticatingUserAccessToken, RoleController.deleteRole);
router.post('/roles/permissions/:id', authenticatingUserAccessToken, RoleController.addPermToRole);
router.delete('/roles/permissions/:id', authenticatingUserAccessToken, RoleController.deletePermFromRole);

// router.get('/', function(req, res){


// })
export default router;