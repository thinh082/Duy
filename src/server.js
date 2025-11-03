'use strict';

require('dotenv').config();
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Listening on http://localhost:${PORT}`);
});


