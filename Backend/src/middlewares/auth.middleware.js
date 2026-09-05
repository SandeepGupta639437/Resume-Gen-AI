const jwt = require('jsonwebtoken')
const tokenBlacklistModel = require("../models/blacklist.model")


async function authUser(req,res,next){
  const authorization = req.headers.authorization
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null
  const token = req.cookies.token || bearerToken

  if(!token){
    return res.status(401).json({ message: "Access denied. No token provided." })
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

  if(isTokenBlacklisted){
    return res.status(401).json({ message: "Token is blacklisted. Please login again." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: "Invalid token." })
  }
}

module.exports = {authUser};