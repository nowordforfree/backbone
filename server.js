var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	var filename = __dirname+req.url;
	var readStream = fs.createReadStream(filename);

	readStream.on('open', function () {
		readStream.pipe(res);
	});

	readStream.on('error', function(err) {
		console.log(err);
		res.end(err.code);
	});
}).listen(8080);