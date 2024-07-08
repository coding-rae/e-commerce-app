const db = require('../db');
const UserService = require('../services/UserService');
const pgp = require('pg-promise')({ capSQL : true});

module.exports = class UserModel {

    /**
     * Create a new user record
     * @param {Object}      data [User data]
     * @return {Object|null}    [Created user account]
     */

    async create(data) {

        try{

            //Generate SQL statement - using helper for dynamic parameter injection
            const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';

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
     * Updates a user record
     * @param {Object}      data [User data]
     * @return {Object|null}        [Updated user record]
     */

    async update(data) {

        try{

            //Generate SQL statement - using helper for dynamic parameter injection
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(data, null, 'users') + condition;

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
     * Finds a user record by email (unique key)
     * @param {String}      data [Email address]
     * @return {Object|null}        [User record]
     */

    async findOneByEmail(email) {

        try{

            //Generate SQL statement
            const statement = 'SELECT * FROM users WHERE email = $1';

            const values = [email];

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
     * Finds a user record by ID (primary key)
     * @param {String}      data [User ID]
     * @return {Object|null}        [User record]
     */

    async findOneById(id) {

        try{

            //Generate SQL statement
            const statement = 'SELECT * FROM users WHERE id = $1';

            const values = [id];

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





}