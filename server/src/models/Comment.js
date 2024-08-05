const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    authorUsername: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    dislikes: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    replies: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
});

const Comment = model('Comment', commentSchema);

module.exports = {
    Comment,
    commentSchema,
};