var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("William get slept on the couch because of a spider");
quotes.push("William is scared to sleep in his bed");
quotes.push("William doesn't shower");
quotes.push("William still takes baths");
quotes.push("William wore his sister's jeans to school");

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'Sample',
                subtitle: 'Spring 23',
                content: theText
            },
            shouldEndSession: 'false'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            if (jsonString.length > 0)
                console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(getRandomQuote()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(3010); //Put number in the 3000 range for testing and 443 for production
