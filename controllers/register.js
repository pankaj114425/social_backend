
const bcrypt = require('bcrypt');
const User = require('../models/user');
async function userSignUpController(req, res) {
  try { 
          const {email,password,username}=req.body;
          if(!email || !password || !username){
            throw new Error("please Provide all credentials")
          }
          const existUserEmail= await User.findOne({email:email});
           if(existUserEmail){
            return res.status(201).json({message:"This email Already exist",success:false})
           }
           const existUsername= await User.findOne({username:username});
           if(existUsername){
            return res.status(201).json({message:"Username Already exist",success:false})
           }
           const salt = bcrypt.genSaltSync(10);
           const hashPassword = await bcrypt.hashSync(password, salt);
           if(!hashPassword){
            throw new Error("Something is wrong")
        }
        const payload = {
          ...req.body,
          password : hashPassword
      }
      const userData = new User(payload)
      const saveUser = await userData.save()
      res.status(200).json({
        data : saveUser,
        success : true,
        error : false,
        message : "User created Successfully!"
    })

  } catch (error) {
    res.status(500).json({ message: error, error: true, success: false });
  }
}

module.exports=userSignUpController;