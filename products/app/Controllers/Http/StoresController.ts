import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Store from 'App/Models/Store';

export default class StoresController {
    public async getAll(ctx: HttpContextContract){
        var result= await Store.all()
        return result
    }
    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = await Store.findOrFail(id)
        return result
    }
    public async create(ctx: HttpContextContract) {
        var fields = ctx.request.all();
        var stores= new Store()
        stores.managerStaffId= fields.manager_staff_id
        stores.addressId= fields.address_id
        var result = await stores.save()
        return result
    }
    public async update(ctx: HttpContextContract) {

        var fields = ctx.request.all();
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
