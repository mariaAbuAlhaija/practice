import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Film from 'App/Models/Film';

export default class FilmsController {
    public async getAll(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var releaseYear=  ctx.request.input("releaseYear")

        var query = Film.query()
        if(releaseYear)
        {
            query.where("release_year", releaseYear)
        }
        var result= await query.preload("language").preload('originalLanguage')
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var id = ctx.params.id; 
        var result = await Film.query().preload("language").preload('originalLanguage').where('id', id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            release_year: schema.date(),
            language_id: schema.number(),
            original_language_id: schema.number(),
            rental_duration: schema.number(),
            rental_rate: schema.number(),
            length: schema.number(),
            replacement_cost: schema.number(),
            rating: schema.enum(["G", "PG", "PG-13", "R", "NC-17"]),
            special_features: schema.enum(["Trailers", "Commentaries", "Deleted Scenes", "Behind the Scenes"]),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var film = new Film();
        film.title = fields.title;
        film.description = fields.description;
        film.releaseYear = fields.release_year;
        film.languageId = fields.language_id;
        film.originalLanguageId = fields.original_language_id;
        film.rentalDuration = fields.rental_duration;
        film.rentalRate = fields.rental_rate;
        film.length = fields.length;
        film.replacementCost = fields.replacement_cost; 
        film.rating = fields.rating; 
        film.specialFeatures = fields.special_features; 
        var result = await film.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            release_year: schema.date(),
            language_id: schema.number(),
            original_language_id: schema.number(),
            rental_duration: schema.number(),
            rental_rate: schema.number(),
            length: schema.number(),
            replacement_cost: schema.number(),
            rating: schema.enum(["G", "PG", "PG-13", "R", "NC-17"]),
            special_features: schema.enum(["Trailers", "Commentaries", "Deleted Scenes", "Behind the Scenes"]),
            id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var film = await Film.findOrFail(id);
        film.title = fields.title;
        film.description = fields.description;
        film.releaseYear = fields.release_year;
        film.languageId = fields.language_id;
        film.originalLanguageId = fields.original_language_id;
        film.rentalDuration = fields.rental_duration;
        film.rentalRate = fields.rental_rate;
        film.length = fields.length;
        film.replacementCost = fields.replacement_cost; 
        film.rating = fields.rating; 
        film.specialFeatures = fields.special_features; 
        var result = await film.save();
        return result;
    }


    public async destory(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var id = ctx.params.id;
        var film = await Film.findOrFail(id);
        await film.delete();
        return { message: "The film has been deleted!" };
    }
}
