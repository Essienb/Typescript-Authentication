import {Model, DataTypes} from 'sequelize';
import {sequelizeInstance} from '../db/DbConnection';


//id, title:admin, slug: unique title, description
//1,   Admin Role,  admin-role,        has all available permission
class Role extends Model {
    declare id: number;
    declare title: string;
    declare slug: string;
    declare description: string;

}

Role.init({
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
        tableName: "roles",
        sequelize: sequelizeInstance
    });

export default Role;


