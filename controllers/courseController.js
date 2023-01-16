
const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')

exports.createCourse = async (req,res) => {
    //template hazır olmadığı için json formatında gönderildi.
    try{
    const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID
    })
        req.flash("success",`${course.name} has been created successfully`) //flash message for create course
        res.status(201).redirect('/courses')
        //res.send('Yeni kurs oluşturuldu')
    }catch(err){
        req.flash("success","Something happened!") 
        res.status(400).redirect('/courses')

        // res.status(400).json({
        //     status: 'fail',
        //     error
        // })
    }
}

exports.getAllCourses = async (req,res) => {

    try{
    const categorySlug = req.query.categories
    const category = await Category.findOne({slug:categorySlug})

    const query = req.query.search //search -> search button name

    let filter = {}
    if(categorySlug){
        filter = {category: category._id}
    }

    if(query){
        filter = {name: query}
    }

    if(!query && !categorySlug){
        filter.name = "",
        filter.category = null
    }

    const courses = await Course.find({
        $or:[
            {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
            {category: filter.category}
        ]
    }).sort('-createdAt').populate('user')

    const categories = await Category.find()
        res.status(200).render('courses', {
            courses,
            categories,
            page_name: "courses"
        })
    }catch(error){
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
    // }catch(error){
    //     res.status(400).json({
    //         status: 'fail',
    //         error
    //     })
    // }
}
exports.getCourse = async (req,res) => {

    try{
    const course = await (await Course.findOne({slug: req.params.slug})).populate('user')
    const categories = await Category.find()
    const user = await User.findById(req.session.userID)
        res.status(200).render('course', {
            course,
            categories,
            page_name: "course",
            user
        })
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err

        })
    }
}
exports.enrollCourse = async (req,res) => {

    try{
    const user = await User.findById(req.session.userID)
    await user.courses.push({_id: req.body.course_id}) //formdan gelen kurs id'sine sahip kursu kullanıcıya ekle
    await user.save()
        res.status(200).redirect('/users/dashboard')
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}
exports.releaseCourse = async (req,res) => {

    try{
    const user = await User.findById(req.session.userID)
    await user.courses.pull({_id: req.body.course_id}) 
    await user.save()
        res.status(200).redirect('/users/dashboard')
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}

exports.deleteCourse = async (req,res) => {

    try{
        const course = await Course.findOneAndRemove({slug: req.params.slug})
        req.flash("success",`${course.name} has been deleted successfully`) //flash message for delete course

        res.status(200).redirect('/users/dashboard')
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}

exports.updateCourse = async (req,res) => {

    try{

        const course = await Course.findOne({slug: req.params.slug})
        course.name = req.body.name
        course.description = req.body.description
        course.category = req.body.category
        
        course.save()

        res.status(200).redirect('/users/dashboard')

    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}



