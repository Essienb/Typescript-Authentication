import {Model, DataTypes} from 'sequelize';
import {sequelizeInstance} from '../db/DbConnection';
import Role from "./Role";
import Permission from "./Permission";


class RolePermission extends Model {
    declare id: number;
    declare roleId: number;
    declare permissionId: number;


}

RolePermission.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: "id"
            },
            allowNull: false,

        },

        permissionId: {
            type: DataTypes.INTEGER,
            references: {
                model: Permission,
                key: "id"
            },
            allowNull: false,
        },
    },

    {
        tableName: "role_permissions",
        sequelize: sequelizeInstance
    });
//defining the Many to Many relationship
Role.belongsToMany(Permission, {through: RolePermission, foreignKey: "roleId"});
Permission.belongsToMany(Role, {through: RolePermission, foreignKey: "permissionId"});

export default RolePermission;


