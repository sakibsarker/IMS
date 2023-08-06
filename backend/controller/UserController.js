const asycHandler =require('../middleware/asyncHandler');
const Userdata=require('../model/userModel');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
const{generateToken}=require('../utils/generateToken');


//post and public access
exports.authUser=asycHandler(async (req, res) => {
  const{email,password}=req.body;
  const user=await Userdata.findOne({email})
  if(user && (await user.matchPassword(password))){
    const token=generateToken(res,user._id);
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    })
  }
  else{
    res.status(401);
    throw new Error('Invalid email or password');
  }

});

//post and public access
exports.registerUser=asycHandler(async (req, res) => {

    const {name,email,password}=req.body;

    const userExists=await Userdata.findOne({email});
    if(userExists){
      res.status(400);
      throw new Error('User already exists');
    }
    const user=await Userdata.create({
      name,
      email,
      password,
    });
    if(user){
      generateToken(res,user._id);
      res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
      });
    }
    else{
      res.status(400);
      throw new Error('Invalid User Data');
    }

  });
//post and private access and logout and clear cookie
exports.logoutUser=asycHandler(async (req, res) => {
    res.cookie('jwt','',{
      httpOnly:true,
      // expiresIn:new Date(0),
      exprires:new Date(0),
    })
    res.status(200).json({message:'Logged out successfully'})
  });

//get user profile and privete accesss
exports.getUserProfile=asycHandler(async (req, res) => {
    const user=await Userdata.findById(req.user._id);

    if(user){
      res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
      });
    }
    else{
      res.status(404);
      throw new Error('User not found');
    }
  });

//put and access privete
exports.updateUserProfile=asycHandler(async (req, res) => {

  const user=await Userdata.findById(req.user._id);

  if(user){
    user.name=req.body.name || user.name,
    user.email=req.body.email || user.email

    if(req.body.password){
      user.password=req.body.password;
    }
    const updatedUser=await user.save()
    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
    });
  }else{
    res.status(404);
    throw new Error('User not found');
  }

  });

//prive and get and admin
exports.getAllUsers=asycHandler(async (req, res) => {
    const users=await Userdata.find({})
    res.status(200).json(users);
  });

//prive and get userby id
exports.getUsersById=asycHandler(async (req, res) => {
    const user=await Userdata.findById(req.params.id).select('-password');
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404);
      throw new Error('User not found');
    }
  });

//private and delete and admin delete user/:id
exports.deleteUsers=asycHandler(async (req, res) => {
  const user=await Userdata.findById(req.params.id)
  if(user){
    if(user.isAdmin){
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await Userdata.deleteOne({_id:user._id});
    res.status(200).json({message:'User deleted successfully'});
  }else{
    res.status(404)
    throw new Error('User not found')

  }

  });

//private and put and admin update user/:id
exports.updateUsers=asycHandler(async (req, res) => {
  const user=await Userdata.findById(req.params.id)
  if(user){
    user.name=req.body.name||user.name;
    user.email=req.body.email||user.email;
    user.isAdmin=Boolean(req.body.isAdmin);

    const updatedUser=await user.save();
    
    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
    });

  }
  else{
    res.status(404)
    throw new Error('User not found')

  }

  });


  

// send mail

// exports.postResetPassword=asycHandler(async(req, res) => {
//   const { email } = req.body;
//   try {

//       const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//               user: process.env.EMAIL,
//               pass: process.env.PASSWORD
//           }
//       });

//       const mailOptions = {
//           from: process.env.EMAIL,
//           to: email,
//           subject: "Rest Password from Injury management sytemem",
//           html: '<p>Rest Password url</p> <h1> You successfully sent Email </h2>'
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//               console.log("Error" + error)
//           } else {
//               console.log("Email sent:" + info.response);
//               res.status(201).json({status:201,info})
//           }
//       })

//   } catch (error) {
//       console.log("Error" + error);
//       res.status(401).json({status:401,error})
//   }
// });


//new with crypto

exports.postResetPassword = asycHandler(async(req, res) => {
  const { email } = req.body;

  const user = await Userdata.findOne({ email: email });

  if (!user) {
    return res.status(400).json({message: 'No account with that email address exists.'});
  }

  // create a token
  const token = crypto.randomBytes(20).toString('hex');

  // update user reset password fields
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  try {
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      });

      const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Reset Password from Injury management system",
          html: `<p>Click <a href='http://localhost:3000/reset/${token}'>here</a> to reset your password.</p>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log("Error" + error)
          } else {
              console.log("Email sent:" + info.response);
              res.status(201).json({status:201,info})
          }
      })
  } catch (error) {
      console.log("Error" + error);
      res.status(401).json({status:401,error})
  }
});
