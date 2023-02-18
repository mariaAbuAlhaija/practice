import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ActorsController {
    public async getAll(ctx: HttpContextContract){
        return Database.from("actors").select("*")
    }
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id;
        return Database.from('actors').select('*').where('id', id)
    }
    public async create(ctx: HttpContextContract) {
        var fields = ctx.request.all();
        const result = await Database
            .table('actors')
            .insert({
                first_name: fields.first_name,
                last_name: fields.last_name,
            });
        var id = result[0];
        var newObject = await Database.from('actors').select("*").where("id", id)
        return newObject[0];
    }
    public async update(ctx: HttpContextContract) {

        var fields = ctx.request.all();
        await Database
            .from('actors')
            .where('id', fields.id)
            .update({ first_name: fields.first_name,
                last_name: fields.last_name });
        return { message: "The actor has been updated!" };
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        await Database
            .from('actors')
            .where('id', id)
            .delete();
        return { message: "The actor has been deleted!" };

    }
}
