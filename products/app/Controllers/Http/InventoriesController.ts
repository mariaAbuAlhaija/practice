import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Inventory from 'App/Models/Inventory'


export default class InventoriesController {
    public async getAll(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
        var result= await Inventory.query()
        .preload("store", (storeQuery)=>
                storeQuery.preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
               addressQuery.preload("city", (profileQuery) => {
                profileQuery.preload('country')
                }))
               .preload('store', (addressQuery)=> 
                addressQuery.preload("address", (profileQuery) => {
                profileQuery.preload('city')
                }))
               .preload("address",
                (addressQuery)=> addressQuery.preload("city", (profileQuery) => {
                profileQuery.preload('country')
               }))))
        .preload('film', (filmQuery)=>{
            filmQuery.preload("language").preload('originalLanguage')
        })
        return result 
    }

    public async getById(ctx: HttpContextContract){
        var obj = await ctx.auth.authenticate()
        var id= ctx.params.id
        var result=  await Inventory.query().preload("store", (storeQuery)=>
        storeQuery.preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
       addressQuery.preload("city", (profileQuery) => {
        profileQuery.preload('country')
        }))
       .preload('store', (addressQuery)=> 
        addressQuery.preload("address", (profileQuery) => {
        profileQuery.preload('city')
        }))
       .preload("address",
        (addressQuery)=> addressQuery.preload("city", (profileQuery) => {
        profileQuery.preload('country')
       }))))
    .preload('film', (filmQuery)=>{
    filmQuery.preload("language").preload('originalLanguage')
        }).where('id', id)
        return result
    }
    public async create(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            film_id: schema.number(),
            store_id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var inventory = new Inventory()
        inventory.filmId= fields.film_id
        inventory.storeId= fields.store_id
        const result = await inventory.save()
        return result
    }
    public async update(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        const newSchema = schema.create({
            film_id: schema.number(),
            store_id: schema.number(),
            id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var id= fields.id
        var inventory= await Inventory.findOrFail(id)
        inventory.filmId= fields.film_id
        inventory.storeId= fields.store_id
        const result = await inventory.save()
        return result
    }

    public async destory(ctx: HttpContextContract) {
        var obj = await ctx.auth.authenticate()
        var id = ctx.params.id
        var inventory = await Inventory.findOrFail(id)
        await inventory.delete()
        return { message: "The inventory has been deleted!" }
    }
}
