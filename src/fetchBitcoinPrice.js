const https = require('https');

const options = {
  method: 'GET',
  hostname: 'rest.coinapi.io',
  path: '/v1/exchangerate/BTC/USD',
  headers: {
    'X-CoinAPI-Key': '7CFA283B-3173-4255-ADF1-E0BDF5980FC5'
  }
};

const request = https.request(options, function (response) {
  let data = '';

  response.on('data', function (chunk) {
    data += chunk;
  });

  response.on('end', function () {

    const parsedData = JSON.parse(data);
    const bitcoinPrice = parsedData.rate; // Adjust this based on the actual API response structure

    // Display the Bitcoin price
    console.log('Bitcoin Price:', bitcoinPrice);
  });
});

request.on('error', function (error) {
  console.error('Error fetching Bitcoin price:', error);
});

request.end();