import {Model, DataTypes} from 'sequelize';
import {sequelizeInstance} from '../db/DbConnection';


class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
    declare phone: string;
    declare roleId: number;

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, 

{
    tableName: "users",
    sequelize: sequelizeInstance
});

export default User;