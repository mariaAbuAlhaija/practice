import I18n from '@ioc:Adonis/Addons/I18n';
import Mail from '@ioc:Adonis/Addons/Mail';
import { HealthReport } from '@ioc:Adonis/Core/HealthCheck';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Schema from '@ioc:Adonis/Lucid/Schema';
import User from 'App/Models/User';

export default class UsersController {
    public async getAll(ctx: HttpContextContract) {
        return "Get All Users";
    }

    public async login(ctx: HttpContextContract){
        // var obj= await ctx.request.all()
        const newSchema= schema.create({
            email: schema.string({}, [
                rules.email(),
            ]),
            password: schema.string()
        })

        var languageFromHeader = ctx.request.header('language');
        var langauge: string = languageFromHeader != null ? languageFromHeader : "ar";

        const fields= await ctx.request.validate({
            schema: newSchema,
            messages:{
                "email.required": I18n.locale(langauge).formatMessage("message.requeired", {field: "email"})
            }
        })

        var email = fields.email
        var password = fields.password
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
    // public async sendingEmail(ctx: HttpContextContract){
    //     await Mail.send( (message) => {
    //         message
    //           .to('mayachamj.gd27@gmail.com')
    //           .from('noreply@example.com')
    //           .subject('Welcome to my website')
    //       })
    // }



}
