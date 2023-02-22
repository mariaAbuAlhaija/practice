import { HealthReport } from '@ioc:Adonis/Core/HealthCheck';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class UsersController {
    public async getAll(ctx: HttpContextContract) {
        return "Get All Users";
    }

    public async login(ctx: HttpContextContract){
        var obj= await ctx.request.all()
        var email = obj.email
        var password = obj.password
        var result = await ctx.auth.attempt(email, password)
        return result
    }

    public async logout(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
        await ctx.auth.logout()
        return { message: "Logout" }
    }

    public async create(ctx: HttpContextContract){
        const newSchema= schema.create({
            email: schema.string({}, [
                rules.email(),
                rules.unique({
                    table: 'User',
                    column: 'email'
                })
            ]),
            password: schema.string()
        })
        const fields = await ctx.request.validate({schema:newSchema})
         var user = new User()
         user.email= fields.email
         user.password= fields.password
         var newuser = await user.save()
         return newuser
    }

}
