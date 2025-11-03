
'use strict';

require('dotenv').config();
const sql = require('mssql');

// Cấu hình kết nối SQL Server
const config = {
  server: process.env.DB_SERVER || 'DESKTOP-TH266UN',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '110604',
  database: process.env.DB_NAME || 'Portal',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // Dùng false cho môi trường local không TLS
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

let poolPromise;

function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => pool)
      .catch((err) => {
        poolPromise = undefined;
        throw err;
      });
  }
  return poolPromise;
}

module.exports = { sql, getPool, config };


