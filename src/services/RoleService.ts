import {PermissionModel, RoleModel} from "../model";
import roleController from "../controller/RoleController";
import RolePermission from "../model/RolePermission";


export interface IRole {
    id: number,
    title: string,
    slug: string,
    description?: string,
}

class RoleService {


    //get by Id
    static async getById(id: number){

        return await RoleModel.findByPk(id, {include: PermissionModel});
    }

    //get by Criteria like email, Id etc
    static async getByCriteria(criteria: any){
        return await RoleModel.findAll({where: criteria});
    }

    //get all Roles
    static async getAll(){
        return await RoleModel.findAll();

    }

    //create
    static async create(values: IRole){
        // console.log(values);
        const {title, slug, description} = values;
        // const [role, created] = await RoleModel.findOrCreate({where: {title, slug, description}});
        return await RoleModel.findOrCreate({where: {title, slug, description}});
        // console.log(created);
        // return role;
    }

    //update
    static async update(id: number, values:any){
        return await RoleModel.update(values, {where: {id:id}});
    }

    //delete
    static async delete(id: number){
        const role = await this.getById(id);
        return await role?.destroy();
    }


    //How to create RolePermission through endpoints
    static async addPermissions(roleId: number, permissionIds: number[]){
        //roleId = 1, permissions = [1,2]
        // for(let i = 0; i>permissionIds.length; i++){
        //     await RolePermission.findOrCreate({where: {roleId: roleId, permissionId: permissionIds[i]}});
        // }
        //writing code in a simpler version

        return permissionIds.map(async (permissionId) => {
            return await RolePermission.findOrCreate({where: {roleId: roleId, permissionId: permissionId}});
        });
    }

    static async deletePermissions(roleId: number, permissionIds: number[]){
        //roleId = 1, permissions = [1,2]
        // for(let i = 0; i>permissionIds.length; i++){
        //     await RolePermission.destroy({where: {roleId: roleId, permissionId: permissionIds[i]}});
        // }
        //writing code in a simpler version
        return permissionIds.map(async (permissionId) => {
            // return await RolePermission.findOne({where: {roleId: roleId, permissionId: permissionId}});
            return await RolePermission.destroy({where: {roleId: roleId, permissionId: permissionId}});
        });
    }

}
export default RoleService;