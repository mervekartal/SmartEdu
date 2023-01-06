const express = require('express')
const courseController = require('../controllers/courseController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router()

router.route('/').post(roleMiddleware(["teacher","admin"]), courseController.createCourse) //http://localhost:3000/courses
router.route('/').get(courseController.getAllCourses) 
router.route('/:slug').get(courseController.getCourse) //kursa ait profil sayfasını getirme
router.route('/enroll').post(courseController.enrollCourse) //kursa kayıt
router.route('/release').post(courseController.releaseCourse) //kurstan ayrılma

module.exports = router