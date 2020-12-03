const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Name is required'
            },
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            required: 'Email is required'
            },
        password: {
            type: String,
            required: "Password is required"
            },
        about: {
            type: String,
            trim: true
            },
        photo: {
            data: Buffer,
            contentType: String
            },
        following: [{type: Schema.ObjectId, ref: 'User'}],
        followers: [{type: Schema.ObjectId, ref: 'User'}]
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", UserSchema);