const mongoose = require('mongoose');

const BlogPostSchema = mongoose.Schema({
    title: {
        type: String,
    },
    mentor_id: {
        type: String
    },
    blog_id: {
        type: String
    },
    replies: [
        {
          user_id: { type: Number, required: true },
          reply: { type: String, required: true },
          repliedAt: { type: Date, default:Date.now },
          isDeleted: { type: Boolean, default: false },
        },
    ],
});

const BlogPosts = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPosts;