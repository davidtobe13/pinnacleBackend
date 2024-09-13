const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
require("dotenv").config()
const jwt = require('jsonwebtoken');
// const cloudinary = require('../utils/cloudinary')
const dynamicHtml = require('../helpers/html.js')
const {sendEmail} = require('../helpers/email')
const axios = require('axios');
const adminModel = require('../models/adminModel.js');
const newsModel = require('../models/newsModel.js');
const contactModel = require('../models/contactModel.js');


exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword} = req.body;

        const userExists = await userModel.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({
                message: `User with email ${userExists.email} already exists`
            });
        }
        const admin = await adminModel.findOne()

        if (!admin){
            return res.status(400).json({
                message: `Admin not found`
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await userModel.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hash,
        });

        const name = `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;
        
        // Assuming `sendEmail` is a function to send emails using the existing transporter
        sendEmail({
            email: user.email,
            subject: `WELCOME, ${name}`,
            html: `

            <!DOCTYPE html>
            <html lang="en">
            <body>
           <div>
           <h4>Welcome to Pinnacle Homes & Motors</h4>
           <br/>
           <p>Dear ${name},</p>
           <p>We are excited to have you on board</p>
           <br/>
            <img src="https://i.ibb.co/hHM5KkY/pinnacle-Logo.png" alt="" style="width: 150px;       max-width: 300px; height: auto; margin: auto; display: block;">
                <h4>You have successfully registered on Pinnacle Homes & Motors. We Offer Sales of Houses, and Trucks/Cars.</h4>
                <br/>
                <h4>We are glad you are here.</h4>
                <br/>
                <p>Best regards,</p>
                <p>Pinnacle Homes & Motors</p>
                <br/>
                <center>
                <p>If you did not sign up for this service, please ignore this email</p>
                <p> &copy; 2019 Pinnacle Homes & Motors. All rights reserved.</p>
                </center>
                    </div>
            </body>
            </html>
          
            `
        }
        // , (error, message) => {
        //     if (error) {
        //         return res.status(500).json({
        //             error: 'Error sending verification email: ' + error.message
        //         });
        //     } else {
        //         return res.status(200).json({
        //             message: message
        //         });
        //     }
        // }
    );

        const date = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{ weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }});
        const time = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }});
        const usersName = `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;

        // Send email to admin
        sendEmail({
            email: admin.email,
            subject: `New User Sign-up Notification`,
            html: `<p>Dear Admin,<br>We are pleased to inform you that a new user has recently signed up on your web app. <br>Here are the user's details:</p><p>Name: ${usersName} <br>Email: ${user.email} <br> Date: ${date} <br> Time: ${time} </p> <p>Please take the necessary steps to welcome and onboard the new user into your system. If you have any further questions or require additional information, feel free to reach out.</p>  <p>Best Regards, <br> Your Developer</p>`
        }
    );

        res.status(201).json({
            message: `Welcome, ${user.firstName} ${user.lastName}. You have created an account successfully`,
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

exports.newsLetter = async (req, res) => {
    try {
        const {email} = req.body;

        const userExists = await newsModel.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({
                message: `User with email ${userExists.email} already subscribed to our News Letter`
            });
        }
        const admin = await adminModel.findOne()

        if (!admin){
            return res.status(400).json({
                message: `Admin not found`
            })
        }

        const user = await newsModel.create({
            email: email.toLowerCase(),
        });

        const name = `${user.email.toUpperCase()}`;

        // Assuming `sendEmail` is a function to send emails using the existing transporter
        sendEmail({
            email: user.email,
            subject: `HELLO, ${name}`,
            html: `

            <!DOCTYPE html>
            <html lang="en">
            <body>
           <div>
           <h4>Welcome to Pinnacle Homes & Motors</h4>
           <br/>
           <p>Dear ${name},</p>
           <p>We are excited you subscribed to our News Letter</p>
           <br/>
            <img src="https://i.ibb.co/hHM5KkY/pinnacle-Logo.png" alt="" style="width: 150px;       max-width: 300px; height: auto; margin: auto; display: block;">
                <h4>You have successfully subscribed for our News Letter.</h4>
                <br/>
                <p>Best regards,</p>
                <p>Pinnacle Homes and Motors</p>
                <br/>
                <center>
                <p>If you did not sign up for this service, please ignore this email</p>
                <p> &copy; 2019 Pinnacle Homes & Motors. All rights reserved.</p>
                </center>
                    </div>
            </body>
            </html>
          
            `
        }
        // , (error, message) => {
        //     if (error) {
        //         return res.status(500).json({
        //             error: 'Error sending verification email: ' + error.message
        //         });
        //     } else {
        //         return res.status(200).json({
        //             message: message
        //         });
        //     }
        // }
    );

        const date = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{ weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }});
        const time = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }});
        // const usersName = `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;

        // Send email to admin
        sendEmail({
            email: admin.email,
            subject: `News Letter Notification`,
            html: `<p>Dear Admin,<br>We are pleased to inform you that a user has recently signed up for your News Letter. <br>Here are the user's details:</p><p>Email: ${user.email} <br> Date: ${date} <br> Time: ${time} </p> <p>If you have any further questions or require additional information, feel free to reach out.</p>  <p>Best Regards, <br> Your Developer</p>`
        }
    );

        res.status(201).json({
            message: `Welcome, ${user.email}. You have successfully subscribed for our News Letter`,
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.contactUs = async (req, res) => {
    try {
        const {email, fullName, subject, message} = req.body;

        // const userExists = await newsModel.findOne({ email: email.toLowerCase() });
        // if (userExists) {
        //     return res.status(400).json({
        //         message: `User with email ${userExists.email} already subscribed to our News Letter`
        //     });
        // }
        const admin = await adminModel.findOne()

        if (!admin){
            return res.status(400).json({
                message: `Admin not found`
            })
        }

        const user = await contactModel.create({
            fullName,
            subject,
            message,
            email: email.toLowerCase(),
        });

        const name = `${user.fullName.toUpperCase()}`;

        // Assuming `sendEmail` is a function to send emails using the existing transporter
        sendEmail({
            email: user.email,
            subject: `HELLO, ${name}`,
            html: `

            <!DOCTYPE html>
            <html lang="en">
            <body>
           <div>
           <h4>Welcome to Pinnacle Homes & Motors</h4>
           <br/>
           <p>Dear ${name},</p>
           <br/>
            <img src="https://i.ibb.co/hHM5KkY/pinnacle-Logo.png" alt="" style="width: 150px;       max-width: 300px; height: auto; margin: auto; display: block;">
                <h4>Thank you for reaching out to us. We will get back to you in due time.</h4>
                <br/>
                <p>Best regards,</p>
                <p>Pinnacle Homes and Motors</p>
                <br/>
                <center>
                <p>If you did not sign up for this service, please ignore this email</p>
                <p> &copy; 2019 Pinnacle Homes & Motors. All rights reserved.</p>
                </center>
                    </div>
            </body>
            </html>
          
            `
        }
        // , (error, message) => {
        //     if (error) {
        //         return res.status(500).json({
        //             error: 'Error sending verification email: ' + error.message
        //         });
        //     } else {
        //         return res.status(200).json({
        //             message: message
        //         });
        //     }
        // }
    );

        const date = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{ weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }});
        const time = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos', ...{hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }});
        // const usersName = `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;

        // Send email to admin
        sendEmail({
            email: admin.email,
            subject: `Contact Notification`,
            html: `<p>Dear Admin,<br>We are pleased to inform you that a user has recently signed up for your News Letter. <br>Here are the user's details:</p><p>Name: ${user.fullName}<br> Email: ${user.email} <br> Subject: ${user.subject} <br> Message: ${user.message} <br> Date: ${date} <br> Time: ${time} </p> <p>If you have any further questions or require additional information, feel free to reach out.</p>  <p>Best Regards, <br> Your Developer</p>`
        }
    );

        res.status(201).json({
            message: `Hello, ${user.fullName}. You have successfully contacted Pinnacle Homes and Motors`,
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};




// exports.login = async (req, res) => {
//     try {
//         const { lastName, password } = req.body;

//         const user = await userModel.findOne({lastName});
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found'
//             });
//         }

//         const isPasswordValid = bcrypt.compareSync(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({
//                 message: 'Invalid password'
//             });
//         }

//         if(user.isVerified === false){
//             return res.status(400).json({
//                 message: "Your account has not been verified. Please wait for admin's verification"
//             });
//         }

//         const token = jwt.sign({
//             userId: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email
//         }, process.env.JWT_KEY, { expiresIn: '10000000s' });

//         res.status(200).json({
//             message: `Welcome onboard, ${user.firstName} ${user.lastName}. You have successfully logged in`,
//             data: user,
//             token
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// };




exports.verifyUser = async (req, res) => {
    try {
        
        const id = req.params.id;
        const {userId} = req.user;

        const admin = await adminModel.findById(userId)
    
        if(!admin){
            return res.status(404).json({
                error: `Admin not found`
            })
        }
        // Find the user by ID
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Update the user's isVerified field
        const updatedUser = await userModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });


        const name = `${user.firstName.toUpperCase()}`;
        // const html = dynamicHtml(name);

        // Assuming `sendEmail` is a function to send emails using the existing transporter
        sendEmail({
            email: user.email,
            subject: `Account Approval`,
            html: `

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8"> <!-- utf-8 works for most cases -->
                <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
                <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
                <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
                <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
                <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
            </head>
            <body style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
                <center style="width: 100%; background-color: #f1f1f1;">
                <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                </div>
                <div style="max-width: 600px; margin: 0 auto;">
                    <!-- BEGIN BODY -->
                  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                      <tr>
                      <td valign="top" style="padding: 1em 2.5em 0 2.5em; background-color: #ffffff;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <!-- <td style="text-align: center;">
                                  </td> -->
                              </tr>
                          </table>
                      </td>
                      </tr><!-- end tr -->
                      <tr>
                      <td valign="middle" style="padding: 3em 0 2em 0;">
                        <img src="https://res.cloudinary.com/dxodxmvdr/image/upload/v1713350524/nmh44riihurl7jtjxljv.png" alt="" style="width: 150px; max-width: 300px; height: auto; margin: auto; display: block;">
                      </td>
                      </tr><!-- end tr -->
                            <tr>
                      <td valign="middle" style="padding: 2em 0 4em 0;">
                        <table>
                            <tr>
                                <td>
                                    <div style="padding: 0 2.5em; text-align: center; margin-bottom: 0px;">
                                        <h3 style="font-family: 'Lato', sans-serif; font-size: 18px; font-weight: 300;">Dear ${name},<br/>Your account has been approved. We are excited to welcome you to Pinnacle Homes & Motors community. Please procees to login  to access our services. <br/> Warm regards, <br/> Pinnacle Homes & Motors</h3>
                                    </div>
                                </td>
                            </tr>
                        </table>
                      </td>
                      </tr><!-- end tr -->
                  <!-- 1 Column Text + Button : END -->
                  </table>
                </div>
              </center>
            </body>
            </html>
          
            `
        });

        res.status(200).json({
            message: 'User is now verified',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};


exports.logOut = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'This user does not exist',
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        user.blacklist.push(token)
        await user.save()

        res.status(200).json({
            message: 'User signed out successfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


// exports.getOne = async (req, res) =>{
//     try{
//         const {userId} = req.user

//         const user = await userModel.findById(userId)

//         if(!user){
//             return res.status(404).json({
//                 message: `User not found here`
//             })
//         }
        
//         res.status(200).json({
//             message: `User fetched successfully`,
//             data: user
//         })

//     }catch(err){
//         res.status(500).json({
//             message: err.message,
//         })
//     }
// }

// exports.getOne = async (req, res) => {
//     try {
//         const { userId } = req.user;

//         // Fetch user data from userModel
//         const user = await userModel.findById(userId);
        
//         // Check if user is found
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found',
//             });
//         }

//         // Fetch admin data from adminModel
//         const admin = await adminModel.findById(userId);
        
//         // Construct response object
//         const response = {
//             message: 'User and admin fetched successfully',
//             data: {
//                 user: user,
//                 admin: admin || 'Admin not found' // Handle case where admin is not found
//             }
//         };

//         res.status(200).json(response);

//     } catch (err) {
//         res.status(500).json({
//             message: err.message,
//         });
//     }
// };

exports.getOne = async (req, res) => {
    try {
        const { userId } = req.user;

        // Fetch user data from userModel
        const user = await userModel.findById(userId);
        
        if (user) {
            // If user is found, return user data
            return res.status(200).json({
                message: 'User fetched successfully',
                data: user
            });
        }

        // Fetch admin data from adminModel
        const admin = await adminModel.findById(userId);

        if (admin) {
            // If admin is found, return admin data
            return res.status(200).json({
                message: 'Admin fetched successfully',
                data: admin 
            });
        }

        // If neither user nor admin is found
        return res.status(404).json({
            message: 'User or Admin not found',
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};



exports.createPin = async (req, res) =>{
    try{
        const userId = req.user.userId
        const {pin} = req.body

        if(!pin || pin.length != 4){
            return res.status(400).json({
                message:`enter a valid 4-digit pin`
            })
        }
        // const salt = bcrypt.genSaltSync(10)
        // const hash = bcrypt.hashSync(pin, salt)
        const user = await userModel.findByIdAndUpdate(userId, {pin}, {new: true})

        if(!user){
            return res.status(404).json({
                message: `User not found`
            })
        }
        

       user.Pin = pin
       user.save()

        res.status(201).json({
            message: `Pin created successfully`,
            data: user
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


exports.profileImage = async (req, res) =>{
    try{
        const userId = req.user.userId

        const file = req.file.filename
        const result = await cloudinary.uploader.upload(file)

        const createProfile =  await userModel.findByIdAndUpdate(userId, {
            profileImage: result.secure_url
        }, {new: true})

        if(!createProfile){
            return res.status(403).json({
                message: `Unable to create this user`
            })
        }
        res.status(201).json({
            message: `Welcome, ${createProfile.firstName}. You have created an account successfully`,
            data: createProfile
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}






exports.getAllTransactions = async (req, res) => {
    try {
      // Fetch user by ID from request or however you're identifying the user
      const {userId} = req.user; 
  
      // Fetch user with populated transactions
      const user = await userModel.findById(userId)
        .populate('Transactions.deposits Transactions.withdrawals Transactions.investments Transactions.interests')
        .exec();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Extract transactions from user object and simplify them
      const transactions = [];
      user.Transactions.deposits.forEach(deposit => {
        transactions.push({
          transactionType: 'Deposit',
          date: deposit.depositDate,
          amount: deposit.amount,
          status: deposit.status
        });
      });
      user.Transactions.withdrawals.forEach(withdrawal => {
        transactions.push({
          transactionType: 'Withdrawal',
          date: withdrawal.withdrawDate,
          amount: withdrawal.amount,
          status: withdrawal.status
  
        });
      });
      user.Transactions.investments.forEach(investment => {
        transactions.push({
          transactionType: 'Investment',
          date: investment.Date,
          amount: investment.amount,
          status: "confirmed"
  
        });
      });
      user.Transactions.interests.forEach(interest => {
        transactions.push({
          transactionType: 'Interest',
          date: interest.Date,
          amount: interest.amount,
          status: "confirmed"
  
        });
      });
  
      // Sort transactions by date
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Return the simplified transactions array
      return res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  



// Controller function to confirm deposits
exports.creditDebit = async (req, res) => {
    try {
        // Extract deposit ID from request parameters
        const { id } = req.params;

        // Extract user ID from request object
        const { userId } = req.user;

        // Extract amount and status from request body
        const { amount, status } = req.body;

        // Validate amount
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: 'Enter a valid amount' });
        }

        // Validate status
        if (status !== 'Debit' && status !== 'Credit') {
            return res.status(400).json({ message: 'Status must be either Debit or Credit' });
        }

        // Find the admin in the database
        const admin = await adminModel.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Find the user in the database
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new credit or debit record
        const creditDebit = new creditOrDebitModel({
            amount: parseFloat(amount),
            status,
            transactionType: status // Assuming transactionType is the same as status
        });

        // Save the credit or debit record
        await creditDebit.save();

        // Update user account balance based on the status
      // Update user account balance based on the status
      if (status === 'Credit') {
        user.acctBalance += parseFloat(amount);
        await user.save();
        return res.status(200).json({ message: `Credited ${amount} to ${user.lastName}` });
    } else if (status === 'Debit') {
        // Check if user has sufficient funds
        if (user.acctBalance < parseFloat(amount)) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        user.acctBalance -= parseFloat(amount);
        await user.save();
        return res.status(200).json({ message: `Debited ${amount} from ${user.lastName}` });
    }
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
