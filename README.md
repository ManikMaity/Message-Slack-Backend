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


## Setup nodemailer
- NodeMailer is a package for sending emails.
- `npm install nodemailer`
- [Atricle to Setup](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628)
- [Create App Password For Gmail Link](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4PjZPv_RFzLvDpJpgNezLLlTZ-eKcC011hXQB6Mh7gjQFn1dLrq76bIrxMqjz4JbJ6YTbapvSKegaX1_YU3qxI-yUuzG_4l33osM5Z6PusG9P2bQyQ)