import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required : [true, "username is required"],
        unique : [true, "username must be unique"],
        match : [/^[a-zA-Z0-9]+$/, "Username must contain only latters and numbers"]
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, "email must be unique"],
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true, "password is required"],
    },
    avatar : {
        type : String,
    }

}, {timestamps : true});

userSchema.pre("save", function (next) {
    const user = this
    user.avatar = `https://robohash.org/${user.username}`
    next()
});

export default mongoose.model("User", userSchema);