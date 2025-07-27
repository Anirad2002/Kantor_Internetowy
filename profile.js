const express = require('express');
const router = express.Router();
const User = require('./user.model');

router.get('/data', async (req, res) => {
  const token = req.headers.authorization;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      success: true, 
      username: user.username, 
      email: user.email, 
      token: user.token,
      balance: user.balance 
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/change-password', async (req, res) => {
  const token = req.headers.authorization;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.password !== oldPassword) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;


