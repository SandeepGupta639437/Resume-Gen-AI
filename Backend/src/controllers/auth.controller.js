const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000
}

/**
 * 
 * @namw registerUserController
 * @description Controller to handle user registration
 * 
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body

  if(!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required"})
  }

  const isUserExist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })

  if(isUserExist) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hash = await bcrypt.hash(password, 10)

  const newUser = await userModel.create({
    username,
    email,
    password: hash
  })

  const token = jwt.sign({id : newUser._id, username : newUser.username}, process.env.JWT_SECRET, { expiresIn: "1d" })

  res.cookie("token", token, cookieOptions)


  
  res.status(201).json({ message: "User registered successfully", user: {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email
  } })

}

/**
 * @name loginUserController`
 * @description Controller to handle user login
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if(!user) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const isPasswordValid = await bcrypt.compare(password,user.password)

  if(!isPasswordValid){
    return res.status(400).json({
      message : "Invalid email or password"
    })
  }

  const token = jwt.sign(
    {id : user._id , username:user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  )

  res.cookie("token", token, cookieOptions)

  res.status(200).json({
    message : "User logged in successfully",
    user : {
      id: user._id,
      username : user.username,
      email : user.email
    }
  })

}


/**
 * @name logoutUserController
 * @description logout by erasing cookies and also blacklisting the token
 * @access public
 */

async function logoutUserController(req,res) {
  const token = req.cookies.token

  if(token){
    await tokenBlacklistModel.create({ token })
  }

  res.clearCookie("token")
  res.status(200).json({ message: "User logged out successfully" })
  
}

 /**
  * @name getMeUserController
  * @description get the logged in user detail .
  * @access private
  */
 async function getMeUserController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
      message:"User detail fetched successfully",
      user:{
        id:user._id,
        username: user.username,
        email: user.email
      }
    })
 }






module.exports = {registerUserController, loginUserController , logoutUserController, getMeUserController}




// we uses token blacklisting for safe logout