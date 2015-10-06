var request = require('request');
var cheerio = require('cheerio');
var prompt = require('sync-prompt').prompt;
var fs = require('fs');

request('http://substack.net/images/', function (error, response, body) {
	if(!error && response.statusCode == 200) {
		console.log(body)
	}
});

