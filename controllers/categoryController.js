
const Category = require('../models/Category')

exports.createCategory = async (req,res) => {
    //template hazır olmadığı için json formatı gönderildi.
    try{
    const category = await Category.create(req.body)
        res.status(201).json({
            status: 'success',
            category: category
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}


