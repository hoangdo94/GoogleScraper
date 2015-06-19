var express = require('express');
var app = express();
var scraper = require('google-search-scraper');
var working = false;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    if (!working) {
        working = true;
        var cont = true;
        var count = 0;
        res.set('Content-Type', 'text/plain');
        scraper.search(options, function(err, url) {
            if (err) throw err;
            if (cont) res.write(url + space);
            count++;
            if (count > limit) {
                cont = false;
                working = false;
                res.end();
            }
        });
        setTimeout(function() {
            cont = false;
            working = false;
            res.end();
        }, limit * 500);
    } else {
        res.end('Current proccessing another query, please try again later');
    }

})

var port = process.env.PORT || 8080;

app.listen(port, function(err) {
    if (err) console.log(err);
    console.log('app is running on port ' + port);
});
