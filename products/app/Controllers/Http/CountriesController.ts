import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CountriesController { public async getAll(ctx: HttpContextContract){
    return Database.from("countries").select("*")
}
public async getById(ctx: HttpContextContract){
    var id= ctx.params.id;
    return Database.from('countries').select('*').where('id', id)
}
public async create(ctx: HttpContextContract) {
    var fields = ctx.request.all();
    const result = await Database
        .table('countries')
        .insert({
            country: fields.country,
        });
    var id = result[0];
    var newObject = await Database.from('countries').select("*").where("id", id)
    return newObject[0];
}
public async update(ctx: HttpContextContract) {

    var fields = ctx.request.all();
    await Database
        .from('countries')
        .where('id', fields.id)
        .update({ country: fields.country});
    return { message: "The country has been updated!" };
}

public async destory(ctx: HttpContextContract) {
    var id = ctx.params.id;
    await Database
        .from('countries')
        .where('id', id)
        .delete();
    return { message: "The country has been deleted!" };

}}
