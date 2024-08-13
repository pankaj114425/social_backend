// const jwt= require('jsonwebtoken')
// async function authToken(req,res,next){
//      try {
//          const token =req.cookies.token;
//          if(!token){
//             return res.status(400).json({message:"user not login",success:false})
//          }
//          jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(err,decoded){
              
              
//              if(err){
//                 console.log('error auth',err)
//              }
//              req.userId=decoded?._id;
//              next();
//          })
         
//      } catch (error) {
//          res.status(400).json({
//             message:error,
//             success:false,
//             data:[]
//          })
//      }
// }
// module.exports=authToken;

const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.token;
        
        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: "User not logged in", success: false });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('Authentication error:', err);
                return res.status(403).json({ message: "Invalid token", success: false });
            }

            // Attach user ID to the request object
            req.userId = decoded?._id;
            next(); // Proceed to the next middleware
        });

    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            message: "Server error",
            success: false,
            data: []
        });
    }
}

module.exports = authToken;
