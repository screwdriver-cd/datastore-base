# datastore base
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][status-image]][status-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

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
    _get(config) {

        // do something to fetch data...

        if (config.params.id > 0) {
            return Promise.resolve({ id: config.params.id });
        }

        return Promise.reject('Some error');
    }
}

const store = new MyDatastore({});
return store.get({ table: 'tablename', params: { id: 1 } })
    .then((err, data) => {
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

Additionally, there is a `setup` function which will be called by Screwdriver to allow the
datastore to create or upgrade tables as needed.

## Interface

### get

| Parameter | Type | Description |
| :-- | :-- | :-- |
|config | Object | Each of its properties defines your get operation |
|config.table | String | The datastore table name |
|config.params| Object | Each of its properties defines the get parameters |
|config.params.id| String | The ID of the item to fetch from the datastore |


#### Expected Outcome
The get function is expected to fetch a single record with a specific id.

#### Expected Return
A promise that resolves to the record if found, null if not found, and rejects if it fails.

###  save

| Parameter | Type | Description |
| :-- | :-- | :-- |
|config | Object | Each of its properties defines your get operation |
|config.table | String | The datastore table name |
|config.params| Object | The data that will be saved in the datastore |

#### Expected Outcome
The save function is expected to save a record to the datastore.

#### Expected Return
A promise that resolves to the record if saved successfully, or rejects if it fails.


###  remove

| Parameter | Type | Description |
| :-- | :-- | :-- |
|config | Object | Each of its properties defines your get operation |
|config.table | String | The datastore table name |
|config.params| Object | Each of its properties defines the get parameters |
|config.params.id| String |  The ID of the data to remove |

#### Expected Outcome
The remove function is expected to remove a record from the datastore.

#### Expected Return
A promise that resolves to null if remove successfully, or rejects if it fails.


###  update

| Parameter | Type | Description |
| :-- | :-- | :-- |
|config | Object | Each of its properties defines your get operation |
|config.table | String | The datastore table name |
|config.params| Object | The data to be updated in the datastore |
|config.params.id| String | The ID that the data is associated with |

Update a record in the datastore. Returns `null` if the record does not exist.

#### Expected Outcome
The update function is expected to update a record in the datastore.

#### Expected Return
A promise that resolves to the record if updated successfully, null if the record does not exist, and rejects if fails.

### scan

| Parameter | Type | Description |
| :-- | :-- | :-- |
|config | Object | Each of its properties defines your get operation |
|config.table | String | The datastore table name |
|config.params| Object | Query to filter on |
|config.paginate| Object | Each of its properties further defines the characteristics for pagination |
|config.paginate.count| Integer | Number of items per page |
|config.paginate.page| Integer | Page number of the set you wish for the datastore to return |

#### Expected Outcome
The scan function is expected to fetch multiple records from the datastore.

#### Expected Return
A promise that resolves to an array of records, or rejects if fails.

#### Example datastores
- [screwdriver-datastore-imdb](https://github.com/screwdriver-cd/datastore-imdb)
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
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/screwdriver.svg
[issues-url]: https://github.com/screwdriver-cd/screwdriver/issues
[status-image]: https://cd.screwdriver.cd/pipelines/14/badge
[status-url]: https://cd.screwdriver.cd/pipelines/14
[daviddm-image]: https://david-dm.org/screwdriver-cd/datastore-base.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/datastore-base
