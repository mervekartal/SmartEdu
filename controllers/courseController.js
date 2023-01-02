
const Course = require('../models/Course')

exports.createCourse = async (req,res) => {
    //template hazır olmadığı için json dosyası gönderildi.
    try{
    const course = await Course.create(req.body)
        res.status(201).json({
            status: 'success',
            course: course
        })
        //res.send('Yeni kurs oluşturuldu')
    }catch(err){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.getAllCourses = async (req,res) => {

    try{
    const courses = await Course.find()
        res.status(200).render('courses', {
            courses,
            page_name: "courses"
        })
    }catch(err){
         res.status(400).json({
         status: 'fail',
         error

        })
    }
    //template hazır olmadığı için json dosyası gönderildi.
    // try{
    // const courses = await Course.find()
    //     res.status(200).json({
    //         status: 'success',
    //         courses: courses
    //     })
    // }catch(err){
    //     res.status(400).json({
    //         status: 'fail',
    //         error
    //     })
    // }
}
exports.getCourse = async (req,res) => {

    try{
    const course = await Course.findById({_id: req.params.id})
        res.status(200).render('course', {
            course,
            page_name: "course"
        })
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err

        })
    }
}
