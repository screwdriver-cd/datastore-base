'use strict';
const assert = require('chai').assert;
const Datastore = require('../index');

describe('index test', () => {
    let instance;

    beforeEach(() => {
        instance = new Datastore({ foo: 'bar' });
    });

    afterEach(() => {
        instance = null;
    });

    it('can create a datastore base class', () => {
        assert.instanceOf(instance, Datastore);
    });

    it('has methods that need to be extended', () => {
        assert.throws(instance.get, Error, 'not implemented');
        assert.throws(instance.save, Error, 'not implemented');
        assert.throws(instance.scan, Error, 'not implemented');
        assert.throws(instance.remove, Error, 'not implemented');
    });

    it('can be extended', (done) => {
        class Foo extends Datastore {
            get(id, callback) {
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
        bar.get(1, (err, data) => {
            assert.isNull(err);
            assert.equal(data.id, 1);
            done();
        });
    });
});
