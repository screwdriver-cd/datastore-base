'use strict';
/* eslint-disable no-underscore-dangle */
const assert = require('chai').assert;
const Joi = require('joi');
const mockery = require('mockery');

describe('index test', () => {
    let instance;
    let Datastore;
    let schemaMock;

    before(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    beforeEach(() => {
        schemaMock = {
            plugins: {
                datastore: {
                    get: Joi.object().keys({
                        table: Joi.string().required(),
                        params: Joi.object().required()
                    }),
                    save: Joi.object().keys({
                        table: Joi.string().required(),
                        params: Joi.object().required()
                    }),
                    update: Joi.object().keys({
                        table: Joi.string().required(),
                        params: Joi.object().required()
                    }),
                    scan: Joi.object().keys({
                        table: Joi.string().required(),
                        paginate: Joi.object().required()
                    }),
                    remove: Joi.object().keys({
                        table: Joi.string().required(),
                        params: Joi.object().required()
                    })
                }
            }
        };
        mockery.registerMock('screwdriver-data-schema', schemaMock);

        /* eslint-disable global-require */
        Datastore = require('../index');
        /* eslint-enable global-require */

        instance = new Datastore({ foo: 'bar' });
    });

    afterEach(() => {
        instance = null;
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(() => {
        mockery.disable();
    });

    it('can create a datastore base class', () => {
        assert.instanceOf(instance, Datastore);
    });

    describe('configure', () => {
        it('has a configure method', () => {
            assert.isFunction(instance.configure);
            instance.configure({});
        });
    });

    describe('get', () => {
        it('returns error when invalid config object', (done) => {
            instance.get({}, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.equal(err.name, 'ValidationError');
                done();
            });
        });

        it('returns not implemented if config object is valid and _get not overridden', (done) => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d3'
                }
            };

            instance.get(config, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.match(err.message, /not implemented/);
                done();
            });
        });
    });

    describe('save', () => {
        it('returns error when invalid config object', (done) => {
            instance.save({}, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.equal(err.name, 'ValidationError');
                done();
            });
        });

        it('returns error if config object is valid and _save not overridden', (done) => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d3',
                    data: {
                        foo: 'bar'
                    }
                }
            };

            instance.save(config, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.match(err.message, /not implemented/);
                done();
            });
        });
    });

    describe('update', () => {
        it('returns error when invalid config object', (done) => {
            instance.update({}, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.equal(err.name, 'ValidationError');
                done();
            });
        });

        it('returns error if config object is valid and _update not overridden', (done) => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d3',
                    data: {
                        foo: 'bar'
                    }
                }
            };

            instance.update(config, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.match(err.message, /not implemented/);
                done();
            });
        });
    });

    describe('scan', () => {
        it('returns error when invalid config object', (done) => {
            instance.scan({}, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.equal(err.name, 'ValidationError');
                done();
            });
        });

        it('returns error if config object is valid and _scan not overridden', (done) => {
            const config = {
                table: 'tableName',
                paginate: {
                    count: 1,
                    page: 40
                }
            };

            instance.scan(config, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.match(err.message, /not implemented/);
                done();
            });
        });
    });

    describe('remove', () => {
        it('returns error when invalid config object', (done) => {
            instance.remove({}, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.equal(err.name, 'ValidationError');
                done();
            });
        });

        it('returns error if config object is valid and _scan not overridden', (done) => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d4'
                }
            };

            instance.remove(config, (err) => {
                assert.isOk(err, 'Error should be returned');
                assert.match(err.message, /not implemented/);
                done();
            });
        });
    });

    it('can be extended', (done) => {
        class Foo extends Datastore {
            _get(config, callback) {
                const id = config.params.id;

                if (id > 0) {
                    return callback(null, { id });
                }

                return process.nextTick(() => {
                    callback(new Error('invalid id'));
                });
            }
        }

        const bar = new Foo({ foo: 'bar' });

        assert.instanceOf(bar, Datastore);
        bar.get({
            table: 'tableName',
            params: {
                id: 1
            }
        }, (err, data) => {
            assert.isNull(err);
            assert.equal(data.id, 1);
            done();
        });
    });
});
