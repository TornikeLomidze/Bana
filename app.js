 // Activate strict mode
'use strict';

// Inject Express.js framework
const express = require('express');

// Path/Routing on the server directories
const path = require('path');

// Enable GZIP compression on sent packets/responses
const compression = require('compression');

// General Security module
const helmet = require('helmet');

// Inject Body Parser to read information which comes from POST/PUT requests
const bodyParser = require('body-parser');

// Initialize express.js application
const app = express();

// Get application port from system variables
const port = process.env.PORT;

// GZIP compression
app.use(compression());

// Disable to load application in iframe which have different origin
app.use(helmet.frameguard({ action: 'sameorigin' }));

// Hide X-Powered-By => Express (for security reasons)
app.disable('x-powered-by');

// app.enable('trust proxy');

// Limit request BODY size to 1mb (temporary size)
app.use(bodyParser.json({
    limit: '1mb'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

let blacklist = [
    '188.169.76.7' // LW
];

// // CORS enable in the middleware to make "public" folder available for everyone
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });


// Render index.html during direct connection
app.get('/', (req, res) => {

    // IP Blacklist filter [START]
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0];

    for (var i = 0; i < blacklist.length; i++) {
        if (ip === blacklist[i]) {
            return res.status(404).end();
            break;
        }
    }
    // IP Blacklist filter [END]

    // detect user agent
    let userAgent = req.headers['user-agent'].toLowerCase();

    // list of robots
    let facebookUserAgent = userAgent.search('facebookexternalhit');
    let googleUserAgent = userAgent.search('googlebot');
    let facebookBotUserAgent = userAgent.search('facebot');
    let bingUserAgent = userAgent.search('bing');
    let twitterUserAgent = userAgent.search('twitter');
    let linkedInUserAgent = userAgent.search('linkedin');
    let vkontakteUserAgent = userAgent.search('vk.com');

    // If robot is detected, then return seo html
    if (googleUserAgent > -1 || facebookUserAgent > -1 || facebookBotUserAgent > -1 || bingUserAgent > -1 || twitterUserAgent > -1 || linkedInUserAgent > -1 || vkontakteUserAgent > -1) {
        res.sendFile(__dirname + '/app/seo.html');
    } else {
        res.sendFile(__dirname + '/app/index.html');
    }
});

// Host static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'app')));

// Render index.html in case of different routes
app.use('/*', (req, res) => {

    // IP Blacklist filter [START]
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0];

    for (var i = 0; i < blacklist.length; i++) {
        if (ip === blacklist[i]) {
            return res.status(404).end();
            break;
        }
    }
    // IP Blacklist filter [END]

    // detect user agent
    let userAgent = req.headers['user-agent'].toLowerCase();

    // list of robots
    let facebookUserAgent = userAgent.search('facebookexternalhit');
    let googleUserAgent = userAgent.search('googlebot');
    let facebookBotUserAgent = userAgent.search('facebot');
    let bingUserAgent = userAgent.search('bing');
    let twitterUserAgent = userAgent.search('twitter');
    let linkedInUserAgent = userAgent.search('linkedin');
    let vkontakteUserAgent = userAgent.search('vk.com');

    // If robot is detected, then return seo html
    if (googleUserAgent > -1 || facebookUserAgent > -1 || facebookBotUserAgent > -1 || bingUserAgent > -1 || twitterUserAgent > -1 || linkedInUserAgent > -1 || vkontakteUserAgent > -1) {
        res.sendFile(__dirname + '/app/seo.html');
    } else {
        res.sendFile(__dirname + '/app/index.html');
    }
});

// Host application on dedicated port
app.listen(port || 3000);
