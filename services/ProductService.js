const createError = require('http-errors');
const ProductModel = require('../models/product');
const { create } = require('domain');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {

    async list(options) {
    try{
        // Load Products
        const products = await ProductModelInstance.find(options);
    
        return products;
    } 
    catch(err) {
     throw err;
    }
};

async get(id) {

    try{
        //Check if Product exists
        const product = await ProductModelInstance.findOne(id);

        //If not product found, reject
        if (!product) {
            throw createError(404, 'Product not found');
        }

        return product;
    } catch(err) {
        throw err;
    }
};

}
