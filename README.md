# Slack Backend

#### New npm packages

- `http-status-codes` - This package is used to return status codes for the API responses.
- `eslint` - eslint is a tool for identifying and reporting on patterns found in JavaScript. [Atricle to Setup](https://medium.com/@sindhujad6/setting-up-eslint-and-prettier-in-a-node-js-project-f2577ee2126f).
- `prettier` - prettier is a code formatter.
- `"simple-import-sort` - This is a pulugin for eslint to sort imports.
- In production we have two environments, development and production.
- So we can setup our database according to the environment in db.config.js.
- [RoboHash](https://robohash.org/) - This is a website which generates avatar images from text for you.

- Add the token to collection variables in postman in script tab beside the Body scrite the following code:

```js
var jsonData = pm.response.json()
var token = jsonData.data.token
pm.collectionVariables.set('slack_token', token)
```

- This will add the token to the collection variables so that we can use it in the next request.

### Message model

```js

const messageSchema = new mongoose.Schema({
    text: String,
    user : {
        type : ObjectId,
        ref : 'User'
    },
    channel : ObjectId,
    likes : [{
        user : ObjectId,
        likeType : String
    }],
    replies : [{
        ObjectId,
        ref : 'Message'
    }],
    seenBy : [{
        user : {
            type : ObjectId,
            ref : 'User'
        },
        seenAt : Date
        seen : Boolean
    }]

}, {timestamps : true})
```
