const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    
};

PostController.findPost = (req, res) => {
    const postId = req.params.id;

    PostModel.findPost(postId)
        .then((foundPost) => {
            if (foundPost) {
                res.json(foundPost);
            } else {
                res.status(404).end();
            }
        })
        .catch((error) => {
            res.status(500).end();
        });
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;