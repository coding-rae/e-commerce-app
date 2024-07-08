const express = require('express');
const router = express.Router();

//Instantiate Service
const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {

    app.use('/orders', router);


    // Order Endpoints
    router.get('/', async (req, res, next) => {

        try{
            const { id } = req.user;

            const response = await OrderServiceInstance.list( id );

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:orderId', async (req, res, next) => {

        try{
            const { orderId } = req.params;


            const response = await OrderrServiceInstance.findById( orderId );

            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });


}