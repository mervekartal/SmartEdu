const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator');


const router = express.Router()

router.route('/signup').post([
    body('name').not().isEmpty().withMessage('Please Enter Your Name')
],authController.createUser) //http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser) 
router.route('/logout').get(authController.logoutUser) 
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage) //url üzerinden dashboard sayfasına gitmek isteyen kullanıcılar, giriş yapmadıysa login sayfasına yönlendirilir. 


module.exports = router