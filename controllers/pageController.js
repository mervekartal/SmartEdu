
exports.getIndexPage = (req,res) => {
    res.status(200).render('index',{
        page_name: "index"
    })
}

exports.getCoursesPage = (req,res) => {
    res.status(200).render('courses',{
        page_name: "courses"
    })
}

exports.getAboutPage = (req,res) => {
    res.status(200).render('about',{
        page_name: "about"
    })
}

exports.getRegisterPage = (req,res) => {
    res.status(200).render('register',{
        page_name: "register"
    })
}