import {PermissionModel} from "../model";


export interface IPermission {
    id: number,
    title: string,
    slug: string,
    description?: string,
}

class PermissionService {


    //get by Id
    static async getById(id: number){
        return await PermissionModel.findByPk(id);
    }

    //get by Criteria like email, Id etc
    static async getByCriteria(criteria: any){
        return await PermissionModel.findAll({where: criteria});
    }

    //get all Roles
    static async getAll(){
        return await PermissionModel.findAll();

    }

    //create
    static async create(values: IPermission){
        const {title, slug, description} = values;
        return await PermissionModel.findOrCreate({where: {title, slug, description}});
    }

    //update
    static async update(id: number, values:any){
        return await PermissionModel.update(values, {where: {id:id}});
    }

    //delete
    static async delete(id: number){
        const permission = await this.getById(id);
        return await permission?.destroy();
    }

}
export default PermissionService;