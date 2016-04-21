var fs = require('fs')
var FixtureLoader = require('./fixture-loader.js');

const ResourceHolder = function(fixtureBasePath) {
	this.resources = {};
	this.fixtureLoader = FixtureLoader(fixtureBasePath);
};

ResourceHolder.prototype = {
	'get': function(url) {
		console.log('GET ' + url + ' is called.');

		var fixtureLoader = this.fixtureLoader;
		var resources = this.resources;
		return new Promise(function (resolve, reject) {
			if(resources[url] !== undefined) {
				console.log('Pre-loaded in-memory resource will be provided');
				resolve(resources[url]);
			}

			var promise = fixtureLoader.load(url);
			promise.then(function (result) {
				resources[url] = JSON.parse(result);
				resolve(JSON.parse(result));
			}).catch(function(error) {
				console.log(error);
				reject(error);
			})
		});
	},

	'set': function(url, resource) {
		console.log('Set resource in [' + url + ']');
		this.resource[url] = resource;
	},

	'delete': function(url) {
		console.log('Delete resource in [' + url + ']');
		this.resources[url] = null;
	}
};

module.exports = function(fixtureBasePath) {
	return new ResourceHolder(fixtureBasePath);
};
