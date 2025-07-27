const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

const getToken = async () => {
    try {
        const oauthUrl = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize';
        const requestData = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: '478022',
            client_secret: '0d337365eb1d939d921b8cc2e946e98f'
        });

        const response = await fetch(oauthUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestData
        });

        if (!response.ok) {
            throw new Error('Wystąpił problem podczas autoryzacji.');
        }

        const { access_token: accessToken } = await response.json();

        const userData = {
            "Imię Nazwisko": process.argv[2],
            "Numer Karty": process.argv[3],
            "Data Ważności": process.argv[4],
            "CVV": process.argv[5],
            "Token": accessToken
        };

        const userDataJSON = JSON.stringify(userData);

        const fileName = 'dane.json';
        const exists = await fs.access(fileName).then(() => true).catch(() => false);

        if (!exists) {
            await fs.writeFile(fileName, userDataJSON);
            console.log('Dane użytkownika zostały pomyślnie zapisane w pliku dane.json');
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error.message);
    }
};

getToken();
