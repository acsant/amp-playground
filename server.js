"use strict";

const dotenv = require('dotenv');
const path = require('path');
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
    console.info(`Request from origin ${origin}`);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(cors());
// Configure AMP CORS
app.use(function (req, res, next) {
  res.setHeader('access-control-allow-credentials', true);
  res.setHeader('access-control-allow-origin', req.header('Origin') || 'https://amp-playground.herokuapp.com');
  res.setHeader('access-control-expose-headers', 'AMP-Access-Control-Allow-Source-Origin');
  res.setHeader('amp-access-control-allow-source-origin', req.header('Origin') || 'https://amp-playground.herokuapp.com');
  res.setHeader('cache-control', 'max-age=0, no-cache, no-store, private');
  next();
});
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
