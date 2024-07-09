const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL : true});


module.exports = class CartItem {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
    }

    /**
     * Create a new cart for user 
     * @param {Object}  data[User data]
     * @return {Object|null}    [Created user record]
     */

async create(userId) {

    try{

        const data = { userId, ...this}

        //Generate SQL statement - using helper for dynamic parameter injection
        const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';

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
     * Loads a cart by User ID (primary key)
     * @param {number}      id [User ID]
     * @return {Object|null}        [Cart record]
     */

static async findOneByUser(userId) {

    try{

        //Generate SQL statement
        const statement = 'SELECT * FROM carts WHERE "userId" = $1';

        const values = [userId];

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

/**
     * Loads a cart by ID (primary key)
     * @param {number}      id [Cart ID]
     * @return {Object|null}        [Cart record]
     */

static async findOneById(id) {

    try{

        //Generate SQL statement
        const statement = 'SELECT * FROM carts WHERE "id" = $1';

        const values = [id];

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