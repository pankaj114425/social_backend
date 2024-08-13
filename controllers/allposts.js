const Post = require('../models/post');

async function allposts(req, res) {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}
module.exports=allposts