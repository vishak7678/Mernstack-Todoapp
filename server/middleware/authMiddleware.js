const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authMiddleware = async (req,res,next) => {
   const token = req.cookies.taskifyUserToken;
 try {
    if(!token) 
    {
        return res.status(401).json({error: "new-user"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if(!user) 
    {
        return res.status(401).json({message: "User not found"});
    }

    req.user = user;
    next();
    
   } catch (error) {
    return res.status(401).json({message: "Invalid token"});
   }
};


module.exports = authMiddleware;