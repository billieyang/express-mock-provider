var express = require('express');
var ResourceHolder = require('./resource-holder.js');

module.exports = function(fixtureBasePath) {
	const app = express();
	var resourceHolder = ResourceHolder(fixtureBasePath);

	app.get('*', function(req, res) {
		var promise = resourceHolder.get(req.url);
		promise.then(function(result) {
			res.send(result);
		}).catch(function(error) {
			res.sendStatus(404);
		});
	});

	app.post('*', function(req, res) {
		res.send(resourceHolder.set(req.url, req.body));
	});

	app.put('*', function(req, res) {
		res.send(resourceHolder.set(req.url, req.body));
	});

	app.delete('*', function(req, res) {
		res.send(200);
	});

	return app;
};
