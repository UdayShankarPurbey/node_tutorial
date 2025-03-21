const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
const registerUser = async (req, res) => {
  try {
    const { username , email , password , role } = req.body;

    const checkExistingUser = await User.findOne({
      $or : [{username} , {email}]
    });
    if(checkExistingUser) {
      return res.status(400).json({ success : false , message: "Username or email already exists" });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("Hashed password : " + hashedPassword );

    const user = await User.create({
      username,
      email,
      password : hashedPassword,
      role : role || 'user',
    })

    if(user) {
      return res.status(200).json({ success : true, message: "User registered successfully" , data : user });
    } else {
      return res.status(400).json({ success : false, message: "Failed to register user" });
    }
    
  } catch (error) {
    console.log("Error registering : " + error);
    res.status(500).json({ success : false ,message: "Error registering user" });
  }
};


//login user
const loginUser = async (req, res) => {
  try {
    const { username, email ,  password } = req.body;
    const user = await User.findOne({ 
      $or : [{username} , {email}]
     });
    if(!user) {
      return res.status(404).json({ success : false , message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({ success : false , message: "Invalid Credentials" });
    }

    const accessToken = await jwt.sign({
      id : user._id,
      username : user.username,
      email : user.email,
      role : user.role
    } , process.env.JWT_SECRET_KEY , {
      expiresIn : "15m"
    });

    const { password : hashedPassword , ...loggedInUser } = user?._doc;
    return res.status(200).json({ success : true, message: "User logged in successfully", data : {
      accessToken,
      ...loggedInUser
    } });
    
  } catch (error) {
    console.log("Error logging in : " + error);
    res.status(500).json({ success : false ,message: "Error logging in user" });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const { oldPassword , newPassword } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    const isPasswordCorrect = await bcrypt.compare(oldPassword , user.password );

    if(!isPasswordCorrect) {
      return res.status(400).json({ success : false , message: "Invalid old password" });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(userId, { password : hashedPassword }, { new: true });
    if(!user) {
      return res.status(404).json({ success : false , message: "User not found" });
    }
    return res.status(200).json({ success : true, message: "Password changed successfully" , data : updatedUser });
    
  } catch (error) {
    console.log("Error changing password : " + error);
    res.status(500).json({ success : false ,message: "Error changing password" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  changePassword,
}