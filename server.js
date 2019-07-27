"use strict";

const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')
dotenv.config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const app = express();

const options = {
    etag: false,
    setHeaders: function (res, path, stat) {
      res.set('Last-Timestamp', Date.now())
    }
};

var whitelist = ['https://amp-playground.herokuapp.com',
                  'https://google.com',
                  'https://amp.dev',
                  'https://amp--playground-herokuapp-com.cdn.ampproject.org'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(cors())
app.enable('trust proxy');

app.set('etag', false);
app.set( 'port', ( process.env.PORT || 8080 ));
app.use('/', express.static(path.join(__dirname, 'public'), options))
app.get('/auth', (req, res) => {
  res.json({ access: Math.random() >= 0.5 })
})

const server = app.listen( app.get('port'), function(error) {
  if (error) {
    console.error(error);
  } else {
    const server_port = app.get('port');
    console.info(`Listening on port ${server_port}.`);
  }

  require('./routes.js')(app);

});
