const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL : true});
const OrderItem = require('./orderItem');

module.exports = class OrderModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.items = data.items || [];
        this.modified = moment.utc().toISOString();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.userID = data.userID || null;
    }

    addItems(items) {
        this.items = items.map(item => new OrderItem(item));
    }

/**
     * Create a new order for user 
     * @return {Object|null}    [Created order record]
     */

async create() {

    try{

        const { items, ...order } = this;

        //Generate SQL statement - using helper for dynamic parameter injection
        const statement = pgp.helpers.insert(order, null, 'orderss') + 'RETURNING *';

        //Execute SQL statement
        const result = await db.query(statement);

        if (result.rows?.length) {
           // Add new information generated in the database ( ie: id ) to the Order instance properties
           Object.assign(this, result.rows[0]);
           return result.rows[0];
        }

        return null;
    } catch(err) {
        throw new Error(err);
    }
}


    /**
     * Updates an order for user
     * @param {Object}      id [Order ID]
     * @param {Object}      data [Order data to update]
     * @return {Object|null}        [Updated order record]
     */

    async update(data) {

        try{

            //Generate SQL statement - using helper for dynamic parameter injection
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
            const statement = pgp.helpers.update(data, null, 'orders') + condition;

            //Execute SQL statement
            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Loads order for user 
     * @param {number}      userId [User ID]
     * @return {Array}        [Order record]
     */

    async findByUser(userId) {

        try{

            //Generate SQL statement
            const statement = 'SELECT * FROM orders WHERE "userId" = $1';

            const values = [userId];

            //Execute SQL statement
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Retrive order by ID (primary key)
     * @param {number}      orderId [Order ID]
     * @return {Object|null}        [Order record]
     */

    static async findById(orderid) {

        try{

            //Generate SQL statement
            const statement = 'SELECT * FROM orders WHERE id = $1';

            const values = [orderId];

            //Execute SQL statement
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw err;
        }
    }


}