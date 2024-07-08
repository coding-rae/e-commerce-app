const express = require('express');
const router = express.Router();

//Instantiate Service
const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

    app.use('/carts', router);


    // Cart Endpoint
    router.get('/mine', async (req, res, next) => {

        try{
            const { id } = req.user;

            const response = await CartServiceInstance.loadCart(id);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.put('/mine', async(res, req, next) => {
        try{
            const { id } = req.user;

            const response = await CartServiceInstance.get({ id });
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    // Create Cart Endpoint
    router.post('/mine', async(res, req, next) => {
        try{
            const { id } = req.user;

            const response = await CartServiceInstance.create({ userId : id });

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    //Add item to Cart / Update Endpoints
    router.post('/mine/items', async(res, req, next) => {
        try{
            const { id } = req.user;
            const data = req.body;

            const response = await CartServiceInstance.addItem(id, data);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.put('/mine/items/:cartItemId', async(res, req, next) => {
        try{
            const { cartItemId } = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateItem(cartItemId, data);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    // Remove item from Cart Endpoint

    router.delete('/mine/items/:cartItemId', async(res, req, next) => {
        try{
            const { cartItemId } = req.params;

            const response = await CartServiceInstance.removeItemItem(cartItemId);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    // Checkout Cart Endpoint
    router.post('/mine/checkout', async(res, req, next) => {
        try{
            const { id } = req.user;
            const { cartId, paymentInfo } = req.body;

            const response = await CartServiceInstance.checkout(cartId, id, paymentInfo);

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
}