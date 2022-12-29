
const Course = require('../models/Course')

exports.createCourse = async (req,res) => {
    //template hazır olmadığı için json dosyası gönderildi.
    const course = await Course.create(req.body)
    try{
        res.status(201).json({
            status: 'success',
            course: course
        })
    }catch{
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
