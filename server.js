const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const payuserverRouter = require('./payuserver')();
const profileRouter = require('./profile');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/profile', express.static(path.join(__dirname, 'public', 'profile')));
app.use('/profile', profileRouter);

const API_KEY = 'ecab5a0834960cf74610b174';
const api_url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const formsDirectory = path.join(__dirname, 'pytania');

if (!fs.existsSync(formsDirectory)) {
    fs.mkdirSync(formsDirectory);
}

const registerRouter = require('./register');
const loginRouter = require('./login');

app.post('/save-form', (req, res) => {
    const formData = req.body;
    const fileName = `formularz${getNextFormNumber()}.txt`;
    const filePath = path.join(formsDirectory, fileName);
    const content = `Imię: ${formData.name}\nEmail: ${formData.email}\nWiadomość: ${formData.message}\n\n`;

    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error('Error saving form:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Form saved successfully:', fileName);
            res.status(200).send('Form saved successfully');
        }
    });
});

function getNextFormNumber() {
    let formNumber = 1;
    while (fs.existsSync(path.join(formsDirectory, `formularz${formNumber}.txt`))) {
        formNumber++;
    }
    return formNumber;
}

// Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Kantor API',
            version: '1.0.0',
            description: 'Dokumentacja API dla kontoru internetowego',
            contact: {
                name: "Api Kantor",
                url: "http://localhost:3000",
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['swagger.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(payuserverRouter);

app.use(express.static(path.join(__dirname, 'public')));

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

app.use(registerRouter);
app.use(loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
