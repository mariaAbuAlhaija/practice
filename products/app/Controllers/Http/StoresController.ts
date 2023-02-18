import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class StoresController {
    public async getAll(ctx: HttpContextContract){
        return Database.from("stores").select("*")
    }
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id;
        return Database.from('stores').select('*').where('id', id)
    }
    public async create(ctx: HttpContextContract) {
        var fields = ctx.request.all();
        const result = await Database
            .table('stores')
            .insert({
                manager_staff_id: fields.manager_staff_id,
                address_id: fields.address_id
            });
        var id = result[0];
        var newObject = await Database.from('stores').select("*").where("id", id)
        return newObject[0];
    }
    public async update(ctx: HttpContextContract) {

        var fields = ctx.request.all();
        await Database
            .from('stores')
            .where('id', fields.id)
            .update({ manager_staff_id: fields.manager_staff_id,
                address_id: fields.address_id});
        return { message: "The store has been updated!" };
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        await Database
            .from('stores')
            .where('id', id)
            .delete();
        return { message: "The store has been deleted!" };

    }
}
