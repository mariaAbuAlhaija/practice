import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import Actor from 'App/Models/Actor';
import { schema } from '@ioc:Adonis/Core/Validator'


export default class ActorsController {
    public async getAll(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var result = await Actor.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {

        var id = ctx.params.id;
        var result = await Actor.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
        const newSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var actor = new Actor();
        actor.firstName = fields.first_name;
        actor.lastName = fields.last_name;
        var result = await actor.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
            id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var actor = await Actor.findOrFail(id);
        actor.firstName = fields.first_name;
        actor.lastName = fields.last_name;
        var result = await actor.save();
        return result;
    }


    public async destory(ctx: HttpContextContract) {

        var id = ctx.params.id;
        var actor = await Actor.findOrFail(id);
        await actor.delete();
        return { message: "The actor has been deleted!" };
    }
}
