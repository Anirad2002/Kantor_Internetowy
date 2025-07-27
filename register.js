const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('./user.model');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/REST_Swagger_Payu')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received registration request:', { username, email, password });

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('User with provided username or email already exists');
    }

    if (!isValidPassword(password)) {
      return res.status(400).send('Password does not meet requirements');
    }

    const token = uuidv4();
    console.log('Generated token:', token);

    const newUser = new User({ username, email, password, token });
    await newUser.save();

    console.log('User registered successfully:', username);

    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

function isValidPassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

module.exports = router;
