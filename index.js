'use strict';
/* eslint-disable no-underscore-dangle */
const Joi = require('joi');
const dataSchema = require('screwdriver-data-schema');
const datastoreSchema = dataSchema.plugins.datastore;

/**
* Validate the config using the schema
* @method  validate
* @param  {Object}    config       Configuration
* @param  {Object}    schema       Joi object used for validation
* @return {Promise}
*/
function validate(config, schema) {
    const result = Joi.validate(config, schema);

    if (result.error) {
        return Promise.reject(result.error);
    }

    return Promise.resolve(config);
}

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
     */
    get(config) {
        return validate(config, datastoreSchema.get)
            .then((validConfig) => this._get(validConfig));
    }

    _get() {
        return Promise.reject('Not implemented');
    }

    /**
     * Create a record in the datastore
     * @method save
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          Table name
     * @param  {Object}   config.params         Record data
     * @param  {String}   config.params.id      Unique id
     * @param  {Object}   config.params.data    The data to save
     */
    save(config) {
        return validate(config, datastoreSchema.save)
            .then((validConfig) => this._save(validConfig));
    }

    _save() {
        return Promise.reject('Not implemented');
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
     */
    update(config) {
        return validate(config, datastoreSchema.update)
            .then((validConfig) => this._update(validConfig));
    }

    _update() {
        return Promise.reject('Not implemented');
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
     */
    scan(config) {
        return validate(config, datastoreSchema.scan)
            .then((validConfig) => this._scan(validConfig));
    }

    _scan() {
        return Promise.reject('Not implemented');
    }

    /**
     * Remove a single record given an id
     * @method remove
     * @param  {Object}   config            Configuration
     * @param  {String}   config.table      table name
     * @param  {Object}   config.params     query params
     * @param  {Object}   config.params.id  Unique id
     */
    remove(config) {
        return validate(config, datastoreSchema.remove)
            .then((validConfig) => this._remove(validConfig));
    }

    _remove() {
        return Promise.reject('Not implemented');
    }
}

module.exports = Datastore;
