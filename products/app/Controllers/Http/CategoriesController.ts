import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';

export default class CategoriesController {

    public async getAll(ctx: HttpContextContract){
        var result= await Category.all()
        return result
    }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result=  await Category.findOrFail(id)
        return result
    }
    public async create(ctx: HttpContextContract) {
        var fields = ctx.request.all()
        var category = new Category
        category.name= fields.name
        const result = await category.save()
        return result
    }
    public async update(ctx: HttpContextContract) {
        var fields = ctx.request.all()
        var id= fields.id
        var category= await Category.findOrFail(id)
        category.name= fields.name
        const result = await category.save()
        return result
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id
        var category = await Category.findOrFail(id)
        await category.delete()
        return { message: "The category has been deleted!" }
    }
}
