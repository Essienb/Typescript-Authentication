import {UserModel, PasswordResetModel} from '../model/index';
import bcrypt from 'bcrypt';

export interface IUser {
    firstName: string, 
    lastName: string,
    email: string,
    password: string,
    phone: string,
    roleId: number
}

class UserService{
    //get User by ID

    static async findById(id: number) {
        //get users unique Id
        //Id gets checked
        return await UserModel.findByPk(id);

    }

    //get all Users
    //get User by Criteria
    static async findByCriteria(criteria: any) {

        return await UserModel.findAll({where: criteria});
    }   

    //Create User
    static async create(values:IUser) {
        //get email
        const email = values.email;

        //email check
        const emailChecked = await UserModel.findAll({where: {email: email}});
        if(emailChecked.length > 0){
                throw "Email already exist";
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(values.password, salt);

        //save user to dtb
        const createdUser = await UserModel.create({
            firstName: values.firstName, 
            lastName: values.lastName,
            email: values.email,
            password: hashedPassword,
            phone: values.phone,
            roleId: values.roleId
        });

        return createdUser; 
        
    }

    //Update user
    static async update(id: number, values: any) {
        //get user attributes by ID and updates any of the fields 
        // required or provided in the interface
        const userById = await UserModel.update(values, {where: {id:id}});   

        //hash the password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(values.password, salt);
    }


    //Delete User
    static async delete(id: number){
        const getUserId = await UserModel.findByPk(id);

        return await getUserId?.destroy();

    }

}
export default UserService;