// index.js
// where your node app starts

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

// Timestamp Microservice
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  const timestampRegex = /^\d+$/;

  // Handle empty date
  if (!date) {
    const currentTime = new Date();
    return res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString()
    });
  }

  // Handle Unix timestamp
  if (timestampRegex.test(date)) {
    const unixTime = parseInt(date);
    return res.json({
      unix: unixTime,
      utc: new Date(unixTime).toUTCString()
    });
  }

  // Handle ISO 8601 and other formats
  const parsedDate = new Date(date);
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
