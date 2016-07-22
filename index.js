'use strict';
/* eslint-disable no-underscore-dangle */
const Joi = require('joi');
const schema = require('screwdriver-data-schema');
const datastoreSchema = schema.plugins.datastore;

class Datastore {
    /**
     * Constructor for Datastore
     * @method constructor
     * @param  {Object}    config Configuration
     * @return {Datastore}
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Reload configuration
     * @method configure
     * @param  {Object}     config      Configuration
     * @param  {Function}   [callback]
     */
    configure(config) {
        this.config = config;
    }

    /**
     * Get a single record given an id
     * @method get
     * @param  {Object}   config            Configuration
     * @param  {String}   config.table      Table name
     * @param  {Object}   config.params     Query params
     * @param  {String}   config.params.id  Unique id
     * @param  {Function} callback          fn(err, data)
     */
    get(config, callback) {
        const result = Joi.validate(config, datastoreSchema.get);

        if (result.error) {
            return callback(result.error);
        }

        return this._get(config, callback);
    }

    _get(config, callback) {
        callback(new Error('not implemented'));
    }

    /**
     * Create a record in the datastore
     * @method save
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          Table name
     * @param  {Object}   config.params         Record data
     * @param  {String}   config.params.id      Unique id
     * @param  {Object}   config.params.data    The data to save
     * @param  {Function} callback              fn(err, data)
     */
    save(config, callback) {
        const result = Joi.validate(config, datastoreSchema.save);

        if (result.error) {
            return callback(result.error);
        }

        return this._save(config, callback);
    }

    _save(config, callback) {
        callback(new Error('not implemented'));
    }

    /**
     * Update a record in the datastore.
     * Requires record to already exists
     * @method save
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          Table name
     * @param  {Object}   config.params         Record data
     * @param  {String}   config.params.id      Unique id
     * @param  {Object}   config.params.data    The data to save
     * @param  {Function} callback              fn(err, data)
     */
    update(config, callback) {
        const result = Joi.validate(config, datastoreSchema.update);

        if (result.error) {
            return callback(result.error);
        }

        return this._update(config, callback);
    }

    _update(config, callback) {
        callback(new Error('not implemented'));
    }

    /**
     * Fetch multiple records from datastore
     * @method scan
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          Table name
     * @param  {Object}   config.params         Query parameters
     * @param  {Object}   config.paginate       Pagination parameters
     * @param  {Number}   config.paginate.count Number of items per page
     * @param  {Number}   config.paginate.page  Specific page of the set to return
     * @param  {Function} callback              fn(err, data)
     */
    scan(config, callback) {
        const result = Joi.validate(config, datastoreSchema.scan);

        if (result.error) {
            return callback(result.error);
        }

        return this._scan(config, callback);
    }

    _scan(config, callback) {
        callback(new Error('not implemented'));
    }

    /**
     * Remove a single record given an id
     * @method remove
     * @param  {Object}   config            Configuration
     * @param  {String}   config.table      table name
     * @param  {Object}   config.params     query params
     * @param  {Object}   config.params.id  Unique id
     * @param  {Function} callback
     */
    remove(config, callback) {
        const result = Joi.validate(config, datastoreSchema.remove);

        if (result.error) {
            return callback(result.error);
        }

        return this._remove(config, callback);
    }

    _remove(config, callback) {
        callback(new Error('not implemented'));
    }
}

module.exports = Datastore;
