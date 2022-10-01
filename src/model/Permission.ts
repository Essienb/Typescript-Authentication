import {Model, DataTypes} from 'sequelize';
import {sequelizeInstance} from '../db/DbConnection';


//id,   title:admin,                slug: unique title,       description
//1,   Create {User}/{Product} ,  create-{user}/{product} ,  can create {user}/{product}
class Permission extends Model {
    declare id: number;
    declare title: string;
    declare slug: string;
    declare description: string;

}

Permission.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },

    {
        tableName: "permissions",
        sequelize: sequelizeInstance
    });

export default Permission;


