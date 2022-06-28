// server.js
// where your node app starts
const moment = require('moment-timezone');
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {

  // if(!req.params.date) return res.json({unix: Date.now(), utc: moment().toString()});

  // let date = moment(req.params.date, "YYYY-MM-DD", true);

  // if(date.isValid()) return res.json({unix: moment(req.params.date).format('x'),
  // utc: moment(req.params.date).tz('GMT').format('ddd, D MMM YYYY HH:mm:ss zz')});

  // if(!isNaN(req.params.date)) return res.json({unix: parseInt(moment.unix(req.params.date / 1000).format('x')),utc: moment.unix(req.params.date / 1000).tz('GMT').format("ddd, D MMM YYYY HH:mm:ss zz")});

  // res.json({error: "Invalid Date"})
  let dateString = req.params.date;
  let date;

  if(!dateString) date = new Date();
  else {
    if(!isNaN(dateString))
      date = new Date(parseInt(dateString));
    else date = new Date(dateString)
  }

  if(date.toString() === 'Invalid Date')
    res.json({error : 'Invalid Date'});
  else res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
