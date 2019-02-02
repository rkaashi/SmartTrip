const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();

// API file for interacting with MongoDB
const routeApp = require('./routes/app');

const httpsOptions = {
  key: fs.readFileSync('./Certificate/key.pem'),
  cert: fs.readFileSync('./Certificate/cert.pem')
};

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/app', routeApp);
//mongoose.connect('mongodb://localhost:27017/SmartTrip');

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

// const server = http.createServer(app);

// server.listen(port, () => console.log(`Running on localhost:${port}`));

const server = https.createServer(httpsOptions, app)
  .listen(port, () => {
    console.log('Running on localhost: ' + port)
  });
