//create a storage for the models 

import User from './User';
import PasswordReset from './PasswordReset';
import Role from "./Role";
import RolePermission from "./RolePermission";
import Permission from "./Permission";
import RefreshToken from "./RefreshToken";

//create a const that will hold an array of all the models we are calling in this file
const models = [User, PasswordReset, Role, Permission, RolePermission,RefreshToken];

models.forEach((model ) => {
    model.sync();
});

//If you use Map to traverse the model class
// const models = [User, PasswordReset];

// models.map((model ) => {
//     model.sync();
// });
export const UserModel = User;
export const PasswordResetModel = PasswordReset;
export const RoleModel = Role;
export const PermissionModel = Permission;
export const RefreshTokenModel = RefreshToken;
