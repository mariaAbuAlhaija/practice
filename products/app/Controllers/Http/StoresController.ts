import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoresController {
    public async getAll(ctx: HttpContextContract){
        var result= await Store.query()
        .preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
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
       })));
        return result
    }
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = await Store.query()
        .preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
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
       }))).where('id', id)
        return result
    }
    public async create(ctx: HttpContextContract) {
        const newSchema = schema.create({
            manager_staff_id: schema.number(),
            address_id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var stores= new Store()
        stores.managerStaffId= fields.manager_staff_id
        stores.addressId= fields.address_id
        var result = await stores.save()
        return result
    }
    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            manager_staff_id: schema.number(),
            address_id: schema.number(),
            id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var stores= await Store.findOrFail(fields.id)
        stores.managerStaffId= fields.manager_staff_id
        stores.addressId= fields.address_id
        var result = await stores.save()
        return result
    }

    public async destory(ctx: HttpContextContract) {
        var id = ctx.params.id
        var stores= await Store.findOrFail(id)
        await stores.delete()
        return { message: "The store has been deleted!" };

    }
}
