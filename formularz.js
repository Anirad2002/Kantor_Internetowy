const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Form = require('./form.model');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'ecab5a0834960cf74610b174';
const api_url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/REST_Swagger_Payu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/save-form', async (req, res) => {
    const formData = req.body;

    try {
        const newForm = new Form({
            name: formData.name,
            email: formData.email,
            message: formData.message
        });

        await newForm.save();
        console.log('Form data saved successfully');
        res.status(200).send('Form data saved successfully');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/rates', (req, res) => {
    https.get(api_url, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData.conversion_rates);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing JSON');
            }
        });
    }).on('error', error => {
        console.error('Error fetching currencies:', error);
        res.status(500).send('Error fetching currencies');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});