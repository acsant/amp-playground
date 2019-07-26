module.exports = function (app) {
  app.use(function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
  });

  app.get('/', function(req, res) {
    res.status(200).sendfile('index.html', { root: './public' });
  });

  app.get('/amp', function(req, res) {
    const responseCode = process.env.STATUS_CODE || 200;
    if (responseCode == 200) {
      res.status(200).sendfile('amp.html', { root: './public' });
    } else {
      res.redirect('/');
    }
  });

}
