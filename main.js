var request = require('request');
var cheerio = require('cheerio');
var prompt = require('sync-prompt').prompt;
var fs = require('fs');

request('http://substack.net/images/', function (error, response, body) {
	if(!error && response.statusCode == 200) {
		var $ = cheerio.load(body);

		var content = [];

		var stream = fs.createWriteStream("content.csv");
		stream.once('open', function(fd) {
			$('tr').each(function(i,elem) {
				var fileName = elem.children[2].children[0].children[0]['data'];
				if(/[a-zA-Z0-9]+\.[a-z]{3}/.test(fileName)){
					var href = elem.children[2].children[0].attribs['href'];
					var permissions = elem.children[0].children[0].children[0]['data'];
					var fileExtension = fileName.split('.')[1]
					stream.write(permissions + "," + href + "," + fileExtension + '\n');
				}
			});

			stream.end();
		});

	} else {
		console.error(error);
	}
})

