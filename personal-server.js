const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: __dirname + '/.env'});

const app = express();
app.use(express.static('_site'))

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log('Personal site listening on port ' + port + '...');
});