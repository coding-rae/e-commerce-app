const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = requre('../models/orderItem');

module.exports = class OrderService {

    async create(data) {
        const { userId } = data;

    try {

        //Instantiate new order and save
        const Order = newOrderModel;
        const order = await Order.create( {userId, total});

        return cart;

    } catch(err) {

        throw err;
    }
};

async listenerCount(userID) {
    try {
        //Load user orders based on ID
        const orders = await OrderModel.findByUserI(userID);

        return orders;
    } catch(err) {
        throw err;
    }
}

async findById(orderID) {
    try{
        //Load user orders based on ID
        const order = await OrderModel.findById(orderId);

        return order;
    } catch(err) {
        throw err;
    }
}
}