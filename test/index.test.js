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
        it('returns error when invalid config object', () =>
            instance.get({})
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err.name, 'ValidationError');
                })
        );

        it('returns not implemented if config object is valid and _get not overridden', () => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d3'
                }
            };

            return instance.get(config)
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err, 'Not implemented');
                });
        });
    });

    describe('save', () => {
        it('returns error when invalid config object', () =>
            instance.save({})
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err.name, 'ValidationError');
                })
        );

        it('returns error if config object is valid and _save not overridden', () => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d3',
                    data: {
                        foo: 'bar'
                    }
                }
            };

            return instance.save(config)
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err, 'Not implemented');
                });
        });
    });

    describe('update', () => {
        it('returns error when invalid config object', () =>
            instance.update({})
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err.name, 'ValidationError');
                })
        );

        it('returns error if config object is valid and _update not overridden', () => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d3',
                    data: {
                        foo: 'bar'
                    }
                }
            };

            return instance.update(config)
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err, 'Not implemented');
                });
        });
    });

    describe('scan', () => {
        it('returns error when invalid config object', () =>
            instance.scan({})
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err.name, 'ValidationError');
                })
        );

        it('returns error if config object is valid and _scan not overridden', () => {
            const config = {
                table: 'tableName',
                paginate: {
                    count: 1,
                    page: 40
                }
            };

            return instance.scan(config)
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err, 'Not implemented');
                });
        });
    });

    describe('remove', () => {
        it('returns error when invalid config object', () =>
            instance.remove({})
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err.name, 'ValidationError');
                })
        );

        it('returns error if config object is valid and _scan not overridden', () => {
            const config = {
                table: 'tableName',
                params: {
                    id: 'a5d4'
                }
            };

            return instance.remove(config)
                .then(() => {
                    throw new Error('Oops');
                }, (err) => {
                    assert.isOk(err, 'Error should be returned');
                    assert.equal(err, 'Not implemented');
                });
        });
    });

    it('can be extended', () => {
        class Foo extends Datastore {
            _get(config) {
                const id = config.params.id;

                if (id > 0) {
                    return Promise.resolve({ id });
                }

                return process.nextTick(() => Promise.reject('invalid id'));
            }
        }

        const bar = new Foo({ foo: 'bar' });
        const config = {
            table: 'tableName',
            params: {
                id: 1
            }
        };

        assert.instanceOf(bar, Datastore);

        return bar.get(config)
            .then((data) => {
                assert.deepEqual(data, { id: 1 });
            });
    });
});
