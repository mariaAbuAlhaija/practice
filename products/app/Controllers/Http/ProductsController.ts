// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
    public async getAll({request, response, params}: HttpContextContract){
        return {products: []};
    }
    public async getProduct({request, response, params}: HttpContextContract){
        return "product";
    }
    public async getProductByCategory({request, response, params}: HttpContextContract){
        return "product";
    }
    public async getLiked({request, response, params}: HttpContextContract){
        return {likedProducts: []};
    }
    public async newProduct({request, response, params}: HttpContextContract){
        return "new Product";
    }
    public async edit({request, response, params}: HttpContextContract){
        return {message: "product edited"};
    }
    public async destroy({request, response, params}: HttpContextContract){
        return {message: "product destroyed"};
    }

}
