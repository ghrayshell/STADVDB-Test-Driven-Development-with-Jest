const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
};

exports.updatePost = (postId, updatedData) => {
    Post.findByIdAndUpdate(postId, updatedData, { new: true }, (err, updatedPost) => {
        next(err, updatedPost);
    });
};

exports.findPost = (postId) => {
    try {
        const foundPost = Post.findById(postId);

        return foundPost;
    } catch (error) {
        console.error(error);
        throw new Error('Error finding post');
    }
};