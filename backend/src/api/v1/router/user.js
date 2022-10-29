var express = require('express');
var router = express.Router();
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
router.get('/users', function (req, res, next) {
    res.send('v1/users');
  });
router.get('/user', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});

//------------------------------------------------------------------------------------------------------------------------------
//   ĐĂNG KÝ
//------------------------------------------------------------------------------------------------------------------------------
// POST: register user
router.post('/register', async (req, res, next) => {
  const { name, password, email } = req.body;
  //Validation
  if (!email || !password || !name)
    return res
      .status(400)
      .json({ error: { name: err.name, messgae: 'Fill full the information' } });
  //Check existing email
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res
        .status(400)
        .json({ success: false, messagae: 'Email already exists' });
    }
    //if all good to register
    const hashPassword = await argon2.hash(password);

    const newUser = new User({ 
        name, 
        password: hashPassword,
        email, 
        isAdmin: email.isAdmin,//mandatory extra email.isAdmin if not defind isAdmin
     });
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN
    );

    res.json({
      success: true,
      message: 'User created successfully',
      isAdmin: email.isAdmin,
      accessToken,
    });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});

//------------------------------------------------------------------------------------------------------------------------------
//   ĐĂNG NHẬP
//------------------------------------------------------------------------------------------------------------------------------
// POST: login user
router.post('/login', async (req, res) => {
  console.log(' đã vô');
  const { email, password } = req.body;

  //Validation(nhập tài khoản)
  if (!email || !password)
    return res
      .status(400)
      .json({ error: { success: false, messgae: 'Fill full the form' } });
  //Check email
  try {
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res
        .status(400)
        .json({ success: false, messagae: 'enter incorrect user' });
    }
    //Check password
    const checkPassword = await argon2.verify(existEmail.password, password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, messagae: 'enter incorrect password' });
    }
    //If check user-password true => NEXT
    const accessToken = jwt.sign(
      { userId: email._id },
      process.env.ACCESS_TOKEN
    );
    console.log(req.body);
    res.json({
      success: true,
      message: 'User logging successfully',
      name: email.name, 
      isAdmin: email.isAdmin,
      accessToken,
    });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message} });
  }
});

module.exports = router;
