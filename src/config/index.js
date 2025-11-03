'use strict';

require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000)
};

module.exports = config;


