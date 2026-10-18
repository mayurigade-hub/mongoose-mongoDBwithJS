# Mongoose User CRUD Practice

A small Node.js project for learning how Mongoose connects to MongoDB and performs CRUD (create, read, update, delete) operations on user documents.

## What this project demonstrates

- Connecting a Node.js application to MongoDB with Mongoose
- Defining a schema and compiling it into a model
- Creating and inserting documents
- Finding documents by filters or ID
- Updating one or many documents
- Deleting one or many documents and returning the deleted document
- Handling asynchronous database operations with Promises

The active operations in `index.js` currently demonstrate deletion. Examples for creating, reading, and updating are included as comments.

## Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB connection URI you can use

The current connection string points to a local MongoDB instance:

```text
mongodb://127.0.0.1:27017/test
```

This connects to the MongoDB server on the same computer and selects the `test` database.

## Setup

Install the project dependencies:

```bash
npm install
```

Make sure MongoDB is running, then start the script:

```bash
node index.js
```

`package.json` does not currently define a start script or a working test script, so run the entry point directly with Node.js.

## How the code works

### 1. Load Mongoose

```js
const mongoose = require('mongoose');
```

This imports Mongoose, the object data modeling (ODM) library used to work with MongoDB from Node.js. Mongoose provides schemas, models, validation, and convenient query methods.

### 2. Connect to MongoDB

```js
main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
```

`mongoose.connect()` opens a connection to MongoDB and returns a Promise. The `async` function uses `await` so it resolves only after the connection succeeds. The `.then()` and `.catch()` handlers report the connection result.

Database operations should run after the connection is established. In the current file, the model queries are started outside the connection flow, so they may begin before `mongoose.connect()` finishes. A safer structure is to connect first, then run the operations from within `main()`.

### 3. Define a schema

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
```

A schema describes the shape and types of fields in a document. Here, a user has a string `name`, a string `email`, and a numeric `age`. MongoDB is flexible about document shape; Mongoose uses this schema to cast values and apply rules defined by the application.

### 4. Create a model

```js
const User = mongoose.model('User', userSchema);
```

A model is the interface used to create, query, update, and delete documents for a collection. Mongoose normally derives a plural, lowercase collection name from the model name, so the `User` model uses the `users` collection by default.

### 5. Delete documents

The file contains examples of several deletion methods:

```js
User.deleteOne({ name: 'John Doe' });
```

Deletes at most one document matching the filter. Its result reports whether a document was deleted; it does not return the deleted document itself.

```js
User.deleteMany({ age: { $lt: 30 } });
```

Deletes every document whose age is less than 30. `$lt` is a MongoDB query operator meaning “less than.” This operation can remove multiple records, so review the filter and database before running it.

```js
User.findOneAndDelete({ name: 'Jane Smith' });
```

Finds one matching document, deletes it, and resolves with the deleted document (or `null` if none matched).

```js
User.findByIdAndDelete('6ad44e349c1187ca65adc7c4');
```

Finds and deletes a document by its MongoDB `_id`, returning the deleted document (or `null`). Replace the example ID with an ID that exists in your database.

Each query returns a Promise. The `.then()` callback handles a successful result, and `.catch()` handles an error.

> **Current code issue:** `index.js` currently has `User,deleteMany(...)` (a comma) instead of `User.deleteMany(...)` (a dot). As written, this is not a valid call to the model method and the script will fail at that line. Correct it before running the deletion examples.

## Other examples in `index.js`

The commented sections show how to create records:

```js
const user = new User({
  name: 'John Doe',
  email: 'john@gmail.com',
  age: 30
});

await user.save();
```

`new User(...)` creates a Mongoose document in memory. `save()` writes it to MongoDB. For inserting multiple users at once, the file also includes an `insertMany()` example.

To read documents, use methods such as:

```js
const youngerUsers = await User.find({ age: { $lt: 30 } });
const user = await User.findById('6ad44e349c1187ca65adc7c4');
```

`find()` returns an array of matching documents. `findById()` returns one document or `null`.

To update documents, the file includes `updateOne()`, `updateMany()`, `findOneAndUpdate()`, and `findByIdAndUpdate()` examples. The `find...AndUpdate` methods can return the updated document when called with `{ new: true }` (or the equivalent return-after option for the installed Mongoose version).

## CRUD overview

| Operation | Common Mongoose methods | Purpose |
|---|---|---|
| Create | `save()`, `create()`, `insertMany()` | Add document(s) |
| Read | `find()`, `findOne()`, `findById()` | Retrieve document(s) |
| Update | `updateOne()`, `updateMany()`, `findOneAndUpdate()` | Change document(s) |
| Delete | `deleteOne()`, `deleteMany()`, `findOneAndDelete()` | Remove document(s) |

## Execution process

1. Node.js loads Mongoose.
2. The application connects to MongoDB using the URI.
3. Mongoose builds the `User` model from the schema.
4. The application runs model queries against the `users` collection.
5. MongoDB returns results, which the Promise handlers log or report as errors.

For reliable sequencing, place the operations after the awaited connection and close the connection when the script is finished. For example:

```js
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  try {
    const result = await User.find({ age: { $lt: 30 } });
    console.log(result);
  } finally {
    await mongoose.disconnect();
  }
}
```

In the project, declare `User` before calling `main()` if using this structure.

## Safety note

The active code deletes data. Test against a development database with disposable records. In particular, `deleteMany()` removes every document matching its filter. Confirm the connection URI and filter before running it.

## Project files

- `index.js` — MongoDB connection, user schema/model, and CRUD examples
- `package.json` — project metadata and the Mongoose dependency
- `package-lock.json` — locked dependency versions for reproducible installs
