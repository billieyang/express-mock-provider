var express = require('express');
var app = express();
var mockProvider = require('./src/mock-provider.js');
var path = require('path');

const fixtureBasePath = path.resolve('./fixtures');
console.log('fixtureBasePath: ' + fixtureBasePath);

app.use(mockProvider(fixtureBasePath));

app.listen(3000, function() {
	console.log('Example app listening on port 3000');
});
