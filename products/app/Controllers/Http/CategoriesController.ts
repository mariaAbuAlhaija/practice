import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
export default class CategoriesController {
    public async getAll(ctx: HttpContextContract){
        return Database.from("categories").select("*")
    }
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id;
        return Database.from('categories').select('*').where('id', id)
    }
    public async create(ctx: HttpContextContract) {
        var fields = ctx.request.all();
        const result = await Database
            .table('categories')
            .insert({
                name: fields.name,
            });
        var id = result[0];
        var newObject = await Database.from('categories').select("*").where("id", id)
        return newObject[0];
    }
    public async update(ctx: HttpContextContract) {

        var fields = ctx.request.all();
        await Database
            .from('categories')
            .where('id', fields.id)
            .update({ name: fields.name});
        return { message: "The category has been updated!" };
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id;
        await Database
            .from('categories')
            .where('id', id)
            .delete();
        return { message: "The category has been deleted!" };

    }
}
