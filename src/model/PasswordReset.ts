import {Model, DataTypes} from 'sequelize';
import {sequelizeInstance} from '../db/DbConnection';

class PasswordReset extends Model{
    declare id: number;
    declare email: string;
    declare token: string;
}

PasswordReset.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }  
    },{
        tableName: "password_reset",
        sequelize: sequelizeInstance
    } );

    export default PasswordReset;
