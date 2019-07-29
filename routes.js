module.exports = function (app) {
  app.use(function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
  });

  app.get('/', function(req, res) {
    res.status(200).sendfile('index.html', { root: './public' });
  });

  app.get('/amp', function(req, res) {
    res.status(200).sendFile('amp.html', { root: './public' });
  });

  app.get('/akash/amp', function(req, res) {
    const statusCode = process.env.STATUS_CODE || 200;
    if (statusCode == 200) {
      res.status(200).sendFile('akash_amp.html', { root: 'public' });
    } else {
      res.redirect(301, '/akash');
    }
  });

  app.get('/akash', function(req, res) {
    const statusCode = process.env.STATUS_CODE || 200;
    if (statusCode == 200) {
      res.status(200).sendFile('akash_index.html', { root: 'public' });
    } else {
      res.status(200).sendFile('index_unlinked.html', { root: 'public' });
    }
  });

}
