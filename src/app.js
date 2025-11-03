'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors());

// Logging
app.use(morgan('dev'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;


