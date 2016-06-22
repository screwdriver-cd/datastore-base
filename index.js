'use strict';
/* eslint-disable no-console */

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
     * @param  {String}   config.table      table name
     * @param  {Object}   config.params     query params
     * @param  {Object}   config.params.id  Unique id
     * @param  {Function} callback
     */
    get() {
        console.error('get is not implemented');
        throw new Error('not implemented');
    }

    /**
     * Create a record in the datastore
     * @method save
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          table name
     * @param  {Object}   config.params         record data
     * @param  {String}   config.params.id      Unique id
     * @param  {Function} callback
     */
    save() {
        console.error('save is not implemented');
        throw new Error('not implemented');
    }

    /**
     * Update a record in the datastore.
     * Requires record to already exists
     * @method save
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          table name
     * @param  {Object}   config.params         record data
     * @param  {String}   config.params.id      Unique id
     * @param  {Function} callback
     */
    update() {
        console.error('update is not implemented');
        throw new Error('not implemented');
    }

    /**
     * Fetch multiple records from datastore
     * @method scan
     * @param  {Object}   config                Configuration
     * @param  {String}   config.table          table name
     * @param  {Object}   config.params         query parameters
     * @param  {Object}   config.paginate       pagination parameters
     * @param  {Function} callback
     */
    scan() {
        console.error('scan is not implemented');
        throw new Error('not implemented');
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
    remove() {
        console.error('remove is not implemented');
        throw new Error('not implemented');
    }
}

module.exports = Datastore;
