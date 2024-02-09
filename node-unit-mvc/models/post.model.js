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
    return new Promise((resolve, reject) => {
        Post.findById(postId, function(err, post) {
            if (!post) {
                reject(new Error('Post not found')); 
            } else {
                Object.assign(post, updatedData);
                post.save(function(err, updatedPost) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updatedPost);
                    }
                });
            }
        });
    });
};

exports.findPost = (postId) => {

};