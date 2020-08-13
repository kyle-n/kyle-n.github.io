const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: __dirname + '/.env'});

const app = express();
app.use(express.static('_site'));

app.listen(80, () => {
  console.log('Personal site listening on port 80...');
});

app.listen(443, () => {
  console.log('Personal site listening on port 443...');
});
