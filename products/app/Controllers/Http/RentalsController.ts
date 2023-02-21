import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Rental from 'App/Models/Rental';

export default class RentalsController {
    public async getAll(ctx: HttpContextContract) {
        var result = await Rental.query()
        .preload('inventory')
        .preload('staff', (staffQuery)=>  staffQuery.preload("address", (addressQuery)=>
            addressQuery.preload("city", (profileQuery) => {
            profileQuery.preload('country')
            }))
            .preload('store', (addressQuery)=> 
            addressQuery.preload("address", (profileQuery) => {
            profileQuery.preload('city')
            }).preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
            addressQuery.preload("city", (profileQuery) => {
            profileQuery.preload('country')
            })))))
        .preload('customer', (customerQuery)=>
        customerQuery.preload("store", (storeQuery)=>
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
        })))).
        preload('address', (addressQuery) =>
        addressQuery.preload("city", (profileQuery) => {
        profileQuery.preload('country')
    })));
        return result;
    }
    
    public async getById(ctx: HttpContextContract) {
    
        var id = ctx.params.id;
        var result = await Rental.query().preload('inventory')
        .preload('staff', (staffQuery)=>  staffQuery.preload("address", (addressQuery)=>
            addressQuery.preload("city", (profileQuery) => {
            profileQuery.preload('country')
            }))
            .preload('store', (addressQuery)=> 
            addressQuery.preload("address", (profileQuery) => {
            profileQuery.preload('city')
            }).preload('managerStaff', (staffQuery)=> staffQuery.preload("address", (addressQuery)=>
            addressQuery.preload("city", (profileQuery) => {
            profileQuery.preload('country')
            })))))
        .preload('customer', (customerQuery)=>
        customerQuery.preload("store", (storeQuery)=>
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
        })))).
        preload('address', (addressQuery) =>
        addressQuery.preload("city", (profileQuery) => {
        profileQuery.preload('country')
    })).where('id', id));;
        return result;
    }
    
    public async create(ctx: HttpContextContract) {
        const newSchema = schema.create({
            rental_date: schema.date(),
            inventory_id: schema.number(),
            staff_id: schema.number(),
            customer_id: schema.number(),
            return_date: schema.date(),
            })
    
        const fields = await ctx.request.validate({ schema: newSchema })
        var rental = new Rental();  
        rental.rentalDate = fields.rental_date;
        rental.inventoryId = fields.inventory_id;
        rental.customerId = fields.customer_id;
        rental.staffId = fields.staff_id;
        rental.returnDate = fields.return_date;
        var result = await rental.save();
        return result;
    }
    
    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            rental_date: schema.date(),
            inventory_id: schema.number(),
            staff_id: schema.number(),
            customer_id: schema.number(),
            return_date: schema.date(),
            id: schema.number(),
          })
    
        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var rental = await Rental.findOrFail(id);
        rental.rentalDate = fields.rental_date;
        rental.inventoryId = fields.inventory_id;
        rental.customerId = fields.customer_id;
        rental.staffId = fields.staff_id;
        rental.returnDate = fields.return_date;
        var result = await rental.save();
        return result;
    }
    
    
    public async destory(ctx: HttpContextContract) {
    
        var id = ctx.params.id;
        var rental = await Rental.findOrFail(id);
        await rental.delete();
        return { message: "The rental has been deleted!" };
    }
}
