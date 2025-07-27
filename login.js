const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('./user.model');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      console.log(`User ${user.username} token:`, user.token);
      return res.json({ success: true, token: user.token });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/logout', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = await User.findOne({ token });
    if (user) {
      user.token = null;
      await user.save();
      console.log('Token deleted for user:', user.username);
      return res.json({ success: true, message: 'User logged out successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging out user:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
