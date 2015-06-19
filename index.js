var express = require('express');
var app = express();
var scraper = require('google-search-scraper');

app.get('/', function(req, res) {
	var query = req.query.q || 'hoang+do';
	var limit = req.query.num || 100;
	var lang = req.query.lang || 'en';
	var space = req.query.space || '<br />';
	var options = {
		query: query,
		limit: limit,
		lang: lang
	}
	console.log(options);
	var cont = true;
	var count = 0;
	res.set('Content-Type', 'text/plain');
    scraper.search(options, function(err, url) {
        if (err) throw err;
        if (cont) res.write(url + space);
        count++;
        if (count > limit) {
        	cont = false;
        	res.end();
        }
    });
})

var port = process.env.PORT || 8080;

app.listen(port, function(err) {
    if (err) console.log(err);
    console.log('app is running on port ' + port);
});
