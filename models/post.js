const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    categories: [{
        type: String
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now
    },
    comments: [{
        text: String,
        created: {type:Date, default: Date.now},
        postedBy: {type: ObjectId, ref: "User"}
    }],
    updated: Date
});

module.exports = mongoose.model("Post", postSchema);