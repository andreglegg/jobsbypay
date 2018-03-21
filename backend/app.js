var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cors = require('cors');
var schedule = require('node-schedule');
var axios = require('axios');
var http = require('http'); // 3. HTTP server
var https = require('https');
var privateKey = fs.readFileSync('./certs/private.key', 'utf8');
var certificate = fs.readFileSync('./certs/certificate.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var app = express();

app.use(cors(), express.static('public'));

/**
 * Get port from environment and store in Express.
 */
var port = '80'; // 2. Using process.env.PORT
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

app.get('/scrape', function (req, res) {

    var url = 'https://stackoverflow.com/jobs?l=Norway&d=20&u=Km&s=1&c=USD&sort=p';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var title, date, link, companyName, location, salary;
            var json = {"jobs": []};


            $('.-job-summary').filter(function (i) {
                var data = $(this);
                title = data.children().filter(".-title").find('.job-link').text();
                date = data.children().filter(".-title").find('.-posted-date').text();
                link = data.children().filter(".-title").find('.job-link').attr('href');
                companyName = data.children().filter(".-company").find('.-name').text(); //data.children().first().next().children().first().text();
                location = data.children().filter(".-company").find('.-location').text(); //data.children().first().next().children().last().text();

                // format date
                date = date.replace(/\s+/g, '');
                date = date.replace("ago", ' ago');

                // format location
                location = location.replace(/\s/g, '');
                location = location.replace("-", '');

                // format companyName
                companyName = companyName.replace(/\s/g, '');

                // format salary
                salary = data.children().filter(".-perks").find('.-salary').text(); //data.children().last().prev().children().text();
                salary = salary.replace(/\s/g, '');
                salary = salary.replace("|", " | ");

                if (salary == "" || salary == "Equity") {
                    return
                }
                console.log(i + "----" + title);
                res.send(i + "----" + title);
                var tempObj = {};
                tempObj.title = title;
                tempObj.date = date;
                tempObj.link = link;
                tempObj.companyName = companyName;
                tempObj.location = location;
                tempObj.salary = salary;
                json.jobs.push(tempObj)
            })


        }

        // Write json file to public dir

        fs.writeFile('./public/output.json', JSON.stringify(json, null, 4), function (err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        });

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check console!')

    });


});

var j = schedule.scheduleJob('30 11 * * *', function () {

    console.log('The answer to life, the universe, and everything!');
    axios.get('http://localhost:80/scrape')
        .then(response => {
            console.log(response.data.url);
            console.log(response.data.explanation);
        })
        .catch(error => {
            console.log(error);
        });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(80); // change port to 8081 for localhost
httpsServer.listen(443); // comment this line for localhost
//app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;