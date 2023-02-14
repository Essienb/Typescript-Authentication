import {response, Router} from "express";
import AuthController from "../controller/AuthController";
import roleRoutes from "./roleRoutes";
import permissionRoutes from "./permissionRoutes";
import validateSchema, {registerSchema} from "../middleware/ValidationMiddleware";
import passwordRouter from "./passwordRoutes";



const router = Router();


router.post('/auth/register', validateSchema(registerSchema), AuthController.register);
router.post('/auth/login', AuthController.userLogin);
// router.post('/refreshToken', AuthController.RefreshToken);
router.get('/refreshToken', AuthController.RefreshToken);

// router.get('/', function(req, res)

//this allows you to authenticate all users before they can access the page
// router.use(roleRoutes, authenticatingUserAccessToken);

router.use(roleRoutes);
router.use(permissionRoutes);
router.use(passwordRouter);

export default router;