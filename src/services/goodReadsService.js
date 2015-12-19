var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var GoodReadsService = function(){

    var getBookById = function(goodReadsId, callback){
        //how cb is called: cb(null, {description: 'This is a great book!'});
        var defaultBookDetails = {
            image_url: 'http://api.randomuser.me/portraits/thumb/women/3.jpg',
            description: 'Book details not available.'
        };
        if(!goodReadsId){
            callback(null, defaultBookDetails);
            return;
        }

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + goodReadsId + '?key=xoImorGmYN8za7AZhjpYBQ'
        };
        console.log('Sending request to fetch book details:');
        console.log(options);

        var handleResponse = function(response){ //response initializer
            var responseText = "";
            response.on('data', function(chunk){
                responseText += chunk;
            });
            response.on('end', function(){
                console.log('Parsing xml result...');
                parser.parseString(responseText, function(err, result){
                    var bookDetails = defaultBookDetails;
                    if(result && result['GoodreadsResponse']){
                        bookDetails = result['GoodreadsResponse'].book;
                    }
                    callback(err, bookDetails);
                });
            });
        };

        http.request(options, handleResponse).end();
    };

    return {
        getBookById : getBookById
    };
};

module.exports = GoodReadsService();