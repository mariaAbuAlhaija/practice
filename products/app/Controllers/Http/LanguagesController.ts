import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Language from 'App/Models/Language'

export default class LanguagesController {
    public async getAll(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
        var result= await Language.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
        var id= ctx.params.id
        var result=  await Language.findOrFail(id)
        return result
    }
    public async create(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            name: schema.string(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var language = new Language
        language.name= fields.name
        const result = await language.save()
        return result
    }
    public async update(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            name: schema.string(),
            id: schema.number(), 
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var id= fields.id
        var language= await Language.findOrFail(id)
        language.name= fields.name 
        const result = await language.save()
        return result
    }

    public async destory(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var id = ctx.params.id
        var language = await Language.findOrFail(id)
        await language.delete()
        return { message: "The language has been deleted!" }
    }
}
