const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, {
    timestamps: true
});

const URL = mongoose.model('url', urlSchema);
module.exports = URL;



/*

This code defines a Mongoose schema for storing URLs and their associated short IDs. Let's break it down:

1. **Mongoose Import**: The code first imports the Mongoose library, which is a MongoDB object modeling tool designed to work in an asynchronous environment.

2. **Schema Definition**: 
   - `urlSchema`: This variable holds the definition of the schema for storing URLs. 
   - `shortId`: It defines a field for storing the short ID of the URL. It's of type `String`, required, and must be unique.
   - `redirectURL`: This field stores the actual URL that the short ID redirects to. It's also of type `String` and required.
   - `visitHistory`: This field is an array of objects, each containing a timestamp representing the visit history of the URL. Each object has a `timestamp` field of type `Number`.
   
3. **Options Object**: The second argument passed to `mongoose.Schema()` specifies additional options for the schema. In this case, it includes `timestamps: true`, which automatically adds `createdAt` and `updatedAt` fields to the documents.

4. **Model Creation**: The `mongoose.model()` function creates a model named `'url'` based on the `urlSchema` schema. This model represents a collection in the MongoDB database where documents will be stored.

5. **Exporting the Model**: The `module.exports` statement exports the `URL` model so that it can be imported and used in other parts of the application.

Flow Explanation:
- With this schema and model defined, you can now use the `URL` model to interact with MongoDB to perform CRUD (Create, Read, Update, Delete) operations on URL documents.
- For example, you can create a new URL document by instantiating a new `URL` object and saving it to the database. You can also find, update, or delete existing URL documents using methods provided by Mongoose's `Model` class.
- When you save a new URL document using this model, it will be stored in a MongoDB collection named `'urls'` by default (MongoDB pluralizes the model name).
- The schema ensures that each URL document contains a unique short ID and a redirect URL, along with an optional visit history.

*/