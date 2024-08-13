const Post = require('../models/post');

async function deletePost(req, res) {
    try {
        // Find the post by ID
        const post = await Post.findById(req.params.id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        // Check if the user is authorized to delete the post
        if (post.userId.toString() !== req.userId) {
            return res.status(401).json({ message: 'You can only delete your own posts', success: false });
        }

        // Delete the post
        await Post.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: 'Post successfully deleted', success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error', success: false });
    }
}

module.exports = deletePost;
