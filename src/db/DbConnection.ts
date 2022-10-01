import { Sequelize } from "sequelize";
import 'dotenv/config';

// const sequilizeInstance = new Sequelize(Dbname, DbUserName, DbPassword, {
//     host: DbHost,
//     port: DbPort,
//     dialect: "mysql"
// });

// const Dbname:string = "userAuthentication";
// const DbUserName:string = "root";
// const DbPassword:string = "oracle";
// const DbHost:string = "localhost";
// const DbPort:number = 3306;


const Dbname:string =(process.env.MYSQL_DB_NAME as string);
const DbUserName:string = (process.env.MYSQL_DB_USERNAME as string);
const DbPassword:string = (process.env.MYSQL_DB_PASSWORD as string);
const DbHost:string = (process.env.MYSQL_DB_HOST as string);
const DbPort:number = parseInt(process.env.MYSQL_DB_PORT as string);
const Dbdialect = "mysql";

export const sequelizeInstance = new Sequelize(Dbname, DbUserName, DbPassword, {
    host: DbHost,
    port: DbPort,
    dialect: Dbdialect
});

export const DbConnection = async function(){
    try{
        await sequelizeInstance.authenticate();
        console.log("DTB connection passed");
    }
    catch(err){
        console.log("DTB connection failed " + err);
    }
}

