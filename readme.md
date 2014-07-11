# Expressive Docs

This is an attempt to build a lazy way to document an API.

> The source code **is** the documentation.

## Idea

Instead of writing an API and then writing docs, this module attempts to leverage the power of Express middleware to provide a self-documenting capability for Express apps.

```javascript
var express = require('express'),
    exdocs = require('expressive-docs');

var app = express();

var things = [ 'thing1', 'thing2', 'thing3' ];

app.route('/api/v1/things')
  .get(function(req, res) {
    res.send(things);
  })
  .post(function(req, res) {
    var thing = req.body;
    things.push(thing);
    res.send(thing);
  });

app.route('/api/v1/things/:thing')
  .get(function(req, res) {
    res.send(things[req.params.thing]);
  })
  .put(function(req, res) {
    things[req.params.thing] = req.body;
    res.send(things[req.params.thing]);
  })
  .delete(function(req, res) {
    things.splice(req.params.thing, 1);
    return things;
  });

app.use('/docs', exdocs(app));
```

Simply by adding `app.use(/'docs', exdocs(app));` after all the route stack is built (but before the 500 & 404 catch-alls!), you can make the following possible:

```javascript
GET http://server:port/docs/api/v1/things =>
{
  keys: [],
  regexp: {},
  route: {
    path: "/api/v1/things",
    stack: [
      { method: "get" },
      { method: "put" }
    ],
    methods: {
      get: true,
      put: true
    }
  },
  params: {}
}
```
