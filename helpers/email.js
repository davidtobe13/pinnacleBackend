// const nodemailer = require("nodemailer")
// require("dotenv").config()

// async function sendEmail(options) {
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure:false,
//   service:process.env.service,

//   auth: {
//     user: process.env.user,
//     pass: process.env.mailpass,
   
//   },
//   tls:{
//     rejectUnauthorized: false
//   }
// });
 
//  const mailOption = await transporter.sendMail({
//     from: process.env.user,
//     to: options.email,
//     subject: options.subject,
//     text: options.text,
//     html: options.html,
//   });

// await transporter.sendMail(mailOption, (error)=>{
//   if (error) {
//    return res.status(500).json({
//     error: 'Error sending verification email' + error.message
//    })
//   }else{
//     return res.status(200).json({
//       message: 'Verification email sent'
//     })
//   }

// })
 
// }
// module.exports = {sendEmail}


const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(options) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      service: process.env.service,
      auth: {
        user: process.env.user,
        pass: process.env.mailpass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOption = {
      from: process.env.user,
      to: options.email,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    // Send email
    await transporter.sendMail(mailOption);

    // Return a success message
    return 'Verification email sent';
  } catch (error) {
    // Return the error
    throw error;
  }
}

module.exports = { sendEmail };
