import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from "App/Models/Address";
import { schema } from '@ioc:Adonis/Core/Validator'

export default class AddressesController {
    public async getAll(ctx: HttpContextContract) {
        var result = await Address.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {

        var id = ctx.params.id;
        var result = await Address.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
        const newSchema = schema.create({
            address: schema.string(),
            address2: schema.string(),
            district: schema.string(),
            city_id: schema.number(),
            last_name: schema.string(),
            postal_code: schema.string(),
            phone: schema.string(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var address = new Address();
        address.address = fields.address;
        address.address2 = fields.address2;
        address.district = fields.district;
        address.cityId = fields.city_id;
        address.postalCode = fields.postal_code;
        address.phone = fields.phone;
        var result = await address.save();
        return result;
    }

    public async update(ctx: HttpContextContract) {
        const newSchema = schema.create({
            address: schema.string(),
            address2: schema.string(),
            district: schema.string(),
            city_id: schema.number(),
            last_name: schema.string(),
            postal_code: schema.string(),
            phone: schema.string(),
            id: schema.number(),
          })

        const fields = await ctx.request.validate({ schema: newSchema })
        var id = fields.id;
        var address = await Address.findOrFail(id);
        address.address = fields.address;
        address.address2 = fields.address2;
        address.district = fields.district;
        address.cityId = fields.city_id;
        address.postalCode = fields.postal_code;
        address.phone = fields.phone;
        var result = await address.save();
        return result;
    }


    public async destory(ctx: HttpContextContract) {

        var id = ctx.params.id;
        var Address = await Address.findOrFail(id);
        await Address.delete();
        return { message: "The Address has been deleted!" };
    }
}
