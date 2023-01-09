const nodemailer = require('nodemailer')


exports.getIndexPage = (req,res) => {
    console.log(req.session.userID)
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

exports.getLoginPage = (req,res) => {
    res.status(200).render('login',{
        page_name: "login"
    })
}
exports.getContactPage = (req,res) => {
    res.status(200).render('contact',{
        page_name: "contact"
    })
}

exports.sendEmail = async (req,res) => {
    const outputMessage = `
    <h3>Mail Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>  
    <h4>Message</h4>  
    <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "camden28@ethereal.email", // generated ethereal user
          pass: "password", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"SmartEdu Contact Form" <camden28@ethereal.email>', // sender address
        to: "test@gmail.com", // list of receivers
        subject: "SmartEdu Contact New Message ✔", // Subject line
        html: outputMessage, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

      res.status(200).redirect('/contact')
}
