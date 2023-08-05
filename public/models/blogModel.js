const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    mentor_id: {
        type: String
    },
});

const Blogs = mongoose.model('Blog', BlogSchema);

module.exports = Blogs;