const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = '809dd210fb1a4d92930e6892';
const api_url = `https://v6.exchangerate-api.com/v6/809dd210fb1a4d92930e6892/latest/USD`;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/zalogowany', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'zalogowany', 'index.html'));
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
