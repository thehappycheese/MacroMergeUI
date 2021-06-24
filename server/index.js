
//let http = require('http')
let httpProxy = require('http-proxy')
let express = require('express');

// create a server
var app = express();
var proxy = httpProxy.createProxyServer({ target: 'http://localhost:3000', ws: true });
var server = require('http').createServer(app);


app.post('/get_columns', function(req, res) {
	console.log("get_columns", req.url);
	res.send('{"cols":["LOL"]}')
  });

// proxy HTTP GET / POST
app.get('/*', function(req, res) {
  console.log("proxying GET request", req.url);
  proxy.web(req, res, {});
});
app.post('/*', function(req, res) {
  console.log("proxying POST request", req.url);
  proxy.web(req, res, {});
});



// Proxy websockets
server.on('upgrade', function (req, socket, head) {
  console.log("proxying upgrade request", req.url);
  proxy.ws(req, socket, head);
});

// serve static content
//app.use('/', express.static(__dirname + "/public"));

server.listen(5000);