const express = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = express.Router()

/**  REGISTER
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController );

/**  LOGIN
 * @route POST/ api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRouter.post('/login',authController.loginUserController)



/**  LOGOUT
 * @route GET /api/auth/logout
 * @description clear token from user cookies and add the token in blacklist
 * @access  public
 */

authRouter.get('/logout',authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get user details of the logged in user
 * @access private
 */

authRouter.get('/get-me',)

module.exports = authRouter