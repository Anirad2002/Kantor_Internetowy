const mongoose = require('mongoose');

const payuSchema = new mongoose.Schema({
    "Imię Nazwisko": { type: String, required: true },
    "Numer Karty": { type: String, required: true },
    "Data Ważności": { type: String, required: true },
    "CVV": { type: String, required: true },
    "Token": { type: String, required: true },
    "Wybrana Waluta": { type: String, required: true },
    "Ilość": { type: Number, required: true },
});

const Payu = mongoose.model('Payment', payuSchema);

module.exports = Payu;