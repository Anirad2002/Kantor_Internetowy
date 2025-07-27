const express = require('express');
const fs = require('fs');
const { fileURLToPath } = require('url');
const path = require('path');
const { exec } = require('child_process');
const Payment = require('./payu.model');
const User = require('./user.model');

const createRouter = () => {
    const router = express.Router();

    router.use(express.json());
    router.use(express.static(path.join(__dirname, 'payu')));
    router.use(express.static(path.join(__dirname, 'success')));

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    router.get('/success.html', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/payu/success.html'));
    });

    router.post('/write_data', async (req, res) => {
        const data = req.body;
        const token = data.Token; 

        if (data) {
            data["Imię Nazwisko"] = Buffer.from(data["Imię Nazwisko"], 'binary').toString('utf-8');
            data["Data Ważności"] = Buffer.from(data["Data Ważności"], 'binary').toString('utf-8');

            try {
                const { default: fetch } = await import('node-fetch');

                const oauthUrl = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize';
                const requestData = {
                    grant_type: 'client_credentials',
                    client_id: '478022',
                    client_secret: '0d337365eb1d939d921b8cc2e946e98f'
                };

                const response = await fetch(oauthUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams(requestData)
                });

                if (!response.ok) {
                    throw new Error('Wystąpił problem podczas autoryzacji.');
                }

                const { access_token: accessToken } = await response.json();
                console.log('Otrzymano token OAuth:', accessToken);

                const newPayment = new Payment({ ...data, Token: accessToken });
                await newPayment.save();

                console.log('Payment data saved successfully');

                const user = await User.findOne({ token }); 

                if (user) {
                    const currency = data["Wybrana Waluta"];
                    const amount = parseFloat(data["Ilość"]);

                    if (currency === 'USD') {
                        user.balance.USD += amount;
                    } else if (currency === 'EUR') {
                        user.balance.EUR += amount;
                    }

                    await user.save();
                    console.log('Balance updated for user:', user.username);
                }

                const output = 'node token.js ' + accessToken;
                exec(output, (error, stdout, stderr) => {
                    if (error) {
                        console.error('Wystąpił błąd podczas uruchamiania token.js:', error);
                        return;
                    }
                    console.log('Token został pomyślnie dodany do bazy danych');
                    console.log(stdout);
                    console.error(stderr);
                    res.redirect('/success.html');
                });
            } catch (err) {
                console.error('Wystąpił błąd podczas zapisywania danych:', err);
                res.status(500).send('Błąd podczas zapisywania danych.');
            }
        } else {
            res.status(400).send('Błąd: brak danych.');
        }
    });

    return router;
};

module.exports = createRouter;
