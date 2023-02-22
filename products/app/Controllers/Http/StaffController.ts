import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Staff from 'App/Models/Staff';

export default class StaffController { 
    public async getAll(ctx: HttpContextContract) {
    var result = await Staff.query()
    .preload("address", (addressQuery)=>
     addressQuery.preload("city", (profileQuery) => {
     profileQuery.preload('country')
   }))
   .preload('store', (addressQuery)=> 
    addressQuery.preload("address", (profileQuery) => {
    profileQuery.preload('city')
  }).preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
  addressQuery.preload("city", (profileQuery) => {
  profileQuery.preload('country')
})))
  );;
    return result;
}

public async getById(ctx: HttpContextContract) {
  var obj = await ctx.auth.authenticate()
    var id = ctx.params.id;
    var result = await Staff.query()
    .preload("address", (addressQuery)=>
     addressQuery.preload("city", (profileQuery) => {
     profileQuery.preload('country')
   }))
   .preload('store', (addressQuery)=> 
    addressQuery.preload("address", (profileQuery) => {
    profileQuery.preload('city')
  }).preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
  addressQuery.preload("city", (profileQuery) => {
  profileQuery.preload('country')
})))
  ).where('id', id);;
    return result;
}

public async create(ctx: HttpContextContract) {
  var obj = await ctx.auth.authenticate()
    const newSchema = schema.create({
        store_id: schema.number(),
        first_name: schema.string(),
        last_name: schema.string(),
        email: schema.string([
            rules.email()
          ]),
        picture: schema.string(),
        address_id: schema.number(),
        active: schema.boolean(),
        username: schema.string(),
        password: schema.string(
            [rules.confirmed(),]
        ),
      })

    const fields = await ctx.request.validate({ schema: newSchema })
    var staff = new Staff();
    staff.storeId = fields.store_id;
    staff.firstName = fields.first_name;
    staff.lastName = fields.last_name;
    staff.email = fields.email;
    staff.picture = fields.picture; 
    staff.addressId = fields.address_id;
    staff.active = fields.active;
    staff.username = fields.username;
    staff.password = fields.password;
    var result = await staff.save();
    return result;
}

public async update(ctx: HttpContextContract) {
    var obj = await ctx.auth.authenticate()
    const newSchema = schema.create({
        store_id: schema.number(),
        first_name: schema.string(),
        last_name: schema.string(),
        email: schema.string([
            rules.email()
          ]),
        picture: schema.string(),
        address_id: schema.number(),
        active: schema.boolean(),
        username: schema.string(),
        password: schema.string([rules.confirmed(),]),
        id: schema.number(),
      })

    const fields = await ctx.request.validate({ schema: newSchema })
    var id = fields.id;
    var staff = await Staff.findOrFail(id);
    staff.storeId = fields.store_id;
    staff.firstName = fields.first_name;
    staff.lastName = fields.last_name;
    staff.email = fields.email;
    staff.picture = fields.picture; 
    staff.addressId = fields.address_id;
    staff.active = fields.active;
    staff.username = fields.username;
    staff.password = fields.password;
    var result = await staff.save();
    return result;
}


public async destory(ctx: HttpContextContract) {
    var obj = await ctx.auth.authenticate()
    var id = ctx.params.id;
    var staff = await Staff.findOrFail(id);
    await staff.delete();
    return { message: "The staff has been deleted!" };
}}
