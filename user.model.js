const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  balance: {
    USD: { type: Number, default: 0 },
    EUR: { type: Number, default: 0 }
  }
});
userSchema.methods.changePassword = async function(newPassword) {
  this.password = newPassword;
  await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
