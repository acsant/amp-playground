"use strict";

const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')
dotenv.config({ path: '.env' });

const express = require('express');
const app = express();

const options = {
    etag: false,
    setHeaders: function (res, path, stat) {
      res.set('Last-Timestamp', Date.now())
    }
};

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
