import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import City from 'App/Models/City';

export default class CitiesController {
    public async getAll(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var result = await City.query().preload("country"); 
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var id = ctx.params.id;
        var result = await City.query().preload("country").where('id', id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            city: schema.string(),
            country_id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var city = new City();
        city.city = fields.city;
        city.countryId = fields.country_id;
        var result = await city.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            city: schema.string(),
            country_id: schema.number(),
            id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var city = await City.findOrFail(id);
        city.city = fields.city;
        city.countryId = fields.country_id;
        var result = await city.save();
        return result;
    }


    public async destory(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var id = ctx.params.id;
        var City = await City.findOrFail(id);
        await City.delete();
        return { message: "The City has been deleted!" };
    }
}
