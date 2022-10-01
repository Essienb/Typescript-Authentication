import { Router } from "express";
import AuthController from "../controller/AuthController";
import roleRoutes from "./roleRoutes";
import permissionRoutes from "./permissionRoutes";
import {authenticatingUserAccessToken} from "../middleware/AuthenticationMiddleware";
import validateSchema, {loginSchema} from "../middleware/ValidationMiddleware";



const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login',validateSchema(loginSchema),  AuthController.userLogin);

// router.get('/', function(req, res)

//this allows you to authenticate all users before they can access the page
router.use(roleRoutes, authenticatingUserAccessToken);

// router.use(roleRoutes);
router.use(permissionRoutes);

export default router;