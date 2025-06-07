const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) 
        {
            return res
            .status(400)
            .json({error: "All fields are required!"});
        }
        if(username.length < 5) 
        {
            return res
            .status(400)
            .json({error: "User name must have 5 characters!"});
        }
        if(password.length < 7) 
        {
            return res
            .status(400)
            .json({error: "Password must have 7 characters!"});
        }
        const checkUser = await User.findOne({ $or: [{ email }, {username}] });
        if(checkUser)
        {
            return res
            .status(400)
            .json({error: "Username and email already exist!"});
        }else
        {
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = new User({username, email, password: hashPassword});
            await newUser.save();
            return res
            .status(200)
            .json({success: "Registration completed"});
        }
    } catch (error) {
       return res
       .status(404)
       .json({error: "Register was faild!"});
    }
};

const login = async (req, res) => {
  try {
    const { email, password} = req.body;
     if(!email || !password) 
        {
            return res
            .status(400)
            .json({error: "All fields are required!"});
        }
        const checkUser = await User.findOne({ email });
        if(checkUser) 
            {
              bcrypt.compare(password, checkUser.password, (err, data) => {
                if(data) 
                    {
                        const token = jwt.sign({id:checkUser._id, email:checkUser.email},
                                      process.env.JWT_SECRET,
                                      {expiresIn: "30d"});
                        res.cookie("taskifyUserToken", token, {
                        httpOnly: true,
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "None",
                    });
                    return res
                    .status(200)
                    .json({success: "Login was Success"});
                }else {
                    return res
                    .status(400)
                    .json({error: "Invalid Credentials"});
                }
            });
        }
  } catch (error) {
    return res
    .status(404)
    .json({error: "Login was faild!"});
  }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("taskifyUserToken", {
            httpOnly: true,
        });
        res.json({message: "Logged out"});
    } catch (error) {
        res.status(404).json({error: "Internal server error"});
    }
}

const userDetails = async (req,res) => {
    try {
        const { user } = req;
        const getDetails = await User.findById(user._id)
        .populate("tasks")
        .select("-password");
         
        if(getDetails) {
           const allTasks = getDetails.tasks;
            let yetToStart = [];
            let inProgress = [];
            let completed = [];
            allTasks.map((item) => {
                if(item.status === "yetToStart") 
                {
                    yetToStart.push(item);
                }else if(item.status === "inProgress")
                {
                    inProgress.push(item);
                }else{
                    completed.push(item);
                }
            });
            console.log(getDetails)
            return res.status(200).json({success: "success",tasks: [{yetToStart},{inProgress},{completed}],
            });
        }
    } catch (error) {
        return res.status(404).json({error: "Internal sserver error"});
    }
} 
 module.exports = {register, login, logout, userDetails};