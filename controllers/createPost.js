const Post = require('../models/post');

async function createPost(req, res) {
    try {
        const data = req.body;
        console.log(data);
        const payload = { ...req.body, userId: req.userId };
        const newPost = new Post(payload);
        const post = await newPost.save();
        
        res.status(200).json({ success: true, message: "Post successfully posted", post: post });
    } catch (error) {
        res.status(400).json({ message: error.message, error: true, success: false });
    }
}

module.exports = createPost;
