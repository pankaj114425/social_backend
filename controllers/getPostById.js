const Post=require('../models/post')
async function getPostById(req,res){
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
        }
    
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}
module.exports= getPostById