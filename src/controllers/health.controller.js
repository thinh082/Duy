'use strict';

const { getPool, sql } = require('../config/db');

exports.db = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT 1 AS ok');
    return res.status(200).json({
      status: 'ok',
      db: result.recordset?.[0]?.ok === 1 ? 'connected' : 'unknown'
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};


