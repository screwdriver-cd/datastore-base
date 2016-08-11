# datastore base
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][wercker-image]][wercker-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

> Base class defining the interface for datastore implementations

This base class should be used for defining different datastore options for the screwdriver api.
The functions exposed contain input validation for to define the contract for datastores so that it
is agnostic of the actual implementation.

## Usage

```bash
npm install screwdriver-datastore-base
```

## Extending
```js
class MyDatastore extends Datastore {
    // Implement the interface
    _get(config, callback) {

        // do something to fetch data...

        if (config.params.id > 0) {
            return callback(null, { id: config.params.id });
        }

        return process.nextTick(() => {
            callback(new Error('invalid id'));
        });
    }
}

const store = new MyDatastore({});
store.get({ table: 'tablename', params: { id: 1 } }, (err, data) => {
    // do something....
});
```

The base class exposes a set of functions:
* `get`
* `save`
* `update`
* `scan`
* `remove`

All of those functions provide input validation on the config object being passed in,
and call an underlying function with the arguments passed in.

To take advantage of the input validation, override these functions:
* `_get`
* `_save`
* `_update`
* `_scan`
* `_remove`

## Validation

### get

Obtain a single record given an id. Returns `null` if the record or table does not exist.

**Arguments**

* `config` - An `object`. Each of its properties defines your get operation
* `config.table` - A `string`. The datastore table name
* `config.params` - An `object`. Each of its properties defines the get parameters
* `config.params.id` - A `string`. The ID of the item to fetch from the datastore
* `callback(err, result)`  - A callback which is called when the task has succeeded. It receives the `err` and `result`. The result is always returned, with a `null` value designating that there is no item to be found.

###  save

Save a record in the datastore. Returns saved data.

**Arguments**

* `config` - An `object`. Each of its properties defines your save operation
* `config.table` - A `string`. The datastore table name
* `config.params` - An `object`. Each of its properties defines the save parameters
* `config.params.id` - A `string`. The ID to associate the data with
* `config.params.data` - An `object`. This is what will be saved in the datastore
* `callback(err, result)`  - A callback which is called when the task has succeeded. It receives the `err` and `result`, where `result` is the data that was saved in the datastore.

###  update

Update a record in the datastore. Returns `null` if the record does not exist.

**Arguments**

* `config` - An `object`. Each of its properties defines your save operation
* `config.table` - A `string`. The datastore table name
* `config.params` - An `object`. Each of its properties defines the save parameters
* `config.params.id` - A `string`. The ID to associate the data with
* `config.params.data` - An `object`. This is what will be saved in the datastore
* `callback(err, result)` - A callback which is called when the task is completed. It receives the `err` and `result`. The result is always returned, with a `null` value if the record does not exist.

### scan

Fetch multiple records from the datastore. Returns error if table does not exist. Returns `[]` if the table is empty.

**Arguments**

* `config` - An `object`. Each of its properties defines your scan operation
* `config.table` - A `string`. The datastore table name
* `config.params` - An `object`. Each of its properties defines the query parameters
* `config.paginate` - An `object`. Each of its properties further defines the characteristics for pagination
* `config.paginate.count` - An `integer`. This is the number of items per page
* `config.paginate.page` - An `integer`. This is the page number of the set you wish for the datastore to return
* `callback(err, result)`  - A callback which is called when the task has succeeded. It receives the `err` and `result`. The expected behavior is:
    * Return an error if the table does not exist.
    * Return an error if the call fails for any reason.
    * Return an empty array `[]` if the table is empty.
    * Return an array of entries if the table is not empty.

#### Example datastores
- [screwdriver-datastore-imdb](https://github.com/screwdriver-cd/screwdriver-datastore-imdb)
- [screwdriver-datastore-dynamodb](https://github.com/screwdriver-cd/datastore-dynamodb)


## Testing

```bash
npm test
```

## License

Code licensed under the BSD 3-Clause license. See LICENSE file for terms.

[npm-image]: https://img.shields.io/npm/v/screwdriver-datastore-base.svg
[npm-url]: https://npmjs.org/package/screwdriver-datastore-base
[downloads-image]: https://img.shields.io/npm/dt/screwdriver-datastore-base.svg
[license-image]: https://img.shields.io/npm/l/screwdriver-datastore-base.svg
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/datastore-base.svg
[issues-url]: https://github.com/screwdriver-cd/datastore-base/issues
[wercker-image]: https://app.wercker.com/status/fbf5553a4f8821567edc6394e976f4ab
[wercker-url]: https://app.wercker.com/project/bykey/fbf5553a4f8821567edc6394e976f4ab
[daviddm-image]: https://david-dm.org/screwdriver-cd/datastore-base.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/datastore-base
