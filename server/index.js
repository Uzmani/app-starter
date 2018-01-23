// Starting point for application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// DB Setup.  Please change URI for new app
mongoose.connect(keys.mongoURI);

//  App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3999;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
