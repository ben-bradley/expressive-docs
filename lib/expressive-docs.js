var docs = require('express').Router();

module.exports = function(app) {

  var routes = app._router.stack.filter(function(r) {
    return r.route;
  });

  routes.forEach(function(r) {
    docs.route(r.route.path)
      .get(function(req, res) {
        res.send(r);
      });
  });

  return docs;
};
