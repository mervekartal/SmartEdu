
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