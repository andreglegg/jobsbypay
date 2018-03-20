var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(express.static('public'))

app.get('/scrape', function (req, res) {

    var url = 'https://stackoverflow.com/jobs?sort=i&l=Norway&d=20&u=Km&s=1&c=USD';

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
                salary = salary.replace("Equity", "");
                salary = salary.replace("|", "");

                if (salary == "") {
                    return
                }
                console.log(i + "----" + title)

                var tempObj = {}
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

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check console!')

    });


})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;