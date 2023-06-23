const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var register = async function (req, res) {
    try {
      const { name, email, password, type } = req.body;
  
    //   // Check if the user already exists
    //   const existingUser = await User.findOne({ where: { email } });
    //   if (existingUser) {
    //     return res.status(409).json({ message: 'User already exists' });
    //   }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        type
      });
  
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      return res.status(500).json({ message: 'apni galti dhundo' });
    }
  }

  



  var login = async function (req, res) {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'koi bhi User ki jagah nai' });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: ' password pe ghor kare' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, 'sejefnsjhw', { expiresIn: '1h' });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  




  module.exports = {
    register,
    login,
    
  };
  