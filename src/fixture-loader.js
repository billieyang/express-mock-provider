var fs = require('fs');
var path = require('path');

const FixtureLoader = function(fixtureBasePath) {
	this.fixtureBasePath = fixtureBasePath;
};

FixtureLoader.prototype = {
	'load': function(url) {
		console.log('FIXTURE: ' + this.fixtureBasePath);
		var pathSegments = url.split('/');
		var parentDirectory = path.join(this.fixtureBasePath, pathSegments.slice(1, -1).join('/'));

		return new Promise(function (resolve, reject) {
			console.log('Checking parentDirectory [' + parentDirectory + ']...');
			if(!fs.existsSync(parentDirectory)) {
				reject('Parent directory not exist');
			}

			var lastPathSegment = pathSegments[pathSegments.length - 1];
			var lastPathPage = lastPathSegment.split('?')[0];
			var queryString = lastPathSegment.split('?')[1] ? lastPathSegment.split('?')[1] : '';

			var candidates = [
				path.join(parentDirectory, '/', lastPathPage, queryString),
				path.join(parentDirectory, '/', lastPathPage, queryString + '.json'),
				path.join(parentDirectory, '/', lastPathSegment + '.json'),
				path.join(parentDirectory, '/', lastPathSegment.replace('?', '_') + '.json'),
				path.join(parentDirectory, '/', lastPathPage),
				path.join(parentDirectory, '/', lastPathPage, '.json'),
				path.join(parentDirectory, '/', lastPathPage, '/index.json')
			];

			for(var i = 0; i < candidates.length; i++) {
				console.log('Try to find file from [' + candidates[i] + '] ...');
				if(fs.existsSync(candidates[i]) && fs.statSync(candidates[i]).isFile()) {
					console.log('Reading file contents from [' + candidates[i] + '] ...');
					resolve(fs.readFileSync(candidates[i]));
					break;
				}
			}

			reject('Matched file is not found');
		});
	}
};

module.exports = function(fixtureBasePath) {
	return new FixtureLoader(fixtureBasePath);
};
