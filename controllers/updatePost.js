const Post=require('../models/post')
async function updatePost (req, res){
    const { title, desc,img } = req.body;
    
    try {
      let post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found',success:"false" });
      }
  
      // Check user
      if (post.userId.toString() !== req.userId) {
        return res.status(401).json({ message: 'You can only update your own posts',success:false });
      }
  
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: { title, desc,img } },
        { new: true }
      );
  
      res.status(200).json({message:"post successfully updated",post,success:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  module.exports=updatePost