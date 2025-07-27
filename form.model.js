const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;