const { Schema, model } = require("mongoose");
const PostSchema = new Schema(
    {
        text: {
            type: String,
            required: 'Text is required'
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
        comments: [{
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
        }],
        postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", PostSchema);