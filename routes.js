const staticPublicKey = "-----BEGIN PUBLIC KEY-----\n\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA13zL6i87HX+0p8Cp/ofy\n\
gRBrNuPDHgU1LLOCnfR/so2kHmph3tlIxo/fowCCLd+Z7NMQrol+3InEdhacf5BO\n\
jL4H37iCF7eawkP8yS6/t4XVK+D/MaD1gRppM793Sy0dJVhynOL4WN2gWHNVxqeo\n\
NcZmd7wQMeEKR/PWP/llMgH5/J0+7sMhcy5OraOB9IUl2Ksv43wcWZDv3Olay77r\n\
Do9MBrTzyYGhlSpcbVcOb9bwXMLrti7z2vt9lYZpPIVRlAhcGbCaxviVXCeod6+d\n\
g0w9Udi7TYAUp8I7SdkJQ5rj9U8hBDY0uTIGRyNYdOiNNhMA+eULsNjVmNt9Y3lh\n\
TwIDAQAB\n\
-----END PUBLIC KEY-----\n";
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
      res.status(200).sendFile('akash_amp.html', { root: './public' });
    } else if (statusCode == 301) {
      res.redirect(301, '/akash');
    } else {
      res.status(404).send('not found');
    }
  });

  app.get('/akash', function(req, res) {
    const statusCode = process.env.STATUS_CODE || 200;
    if (statusCode == 200) {
      res.status(200).sendFile('akash_index.html', { root: './public' });
    } else {
      res.status(200).sendFile('index_unlinked.html', { root: './public' });
    }
  });

  app.get('/.well-known/amphtml/apikey.pub', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(staticPublicKey, { 'Content-Type': 'text/plain' }, 200);
  });

}
