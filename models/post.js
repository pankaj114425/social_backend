const mongoose=require("mongoose")



const PostSchema=new mongoose.Schema(
    {
    
     userId:{
        type:String,
        required:true
     },
     username:{
      type:String,
        required:true
     },
     userPic:{
      type:String
      },
     desc:{
        type:String,
        max:500
     },
     title:{
      type:String,
      max:50
   },
     img:{
        type:String
     },
   
},
{timestamps:true}
 
);
module.exports=mongoose.model("Post",PostSchema)