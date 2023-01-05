const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' //Category modeli referans olarak verildi, onun id'si kaydedilecek.
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

//url'de id göndermek yerine kurs adını kullanarak bir slug oluşturup slug'ı gönderdik.
CourseSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next()
})


const Course = mongoose.model('Course',CourseSchema)
module.exports = Course

