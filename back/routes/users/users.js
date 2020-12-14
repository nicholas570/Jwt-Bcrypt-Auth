const express = require('express');
const connection = require('../../database/conf');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM user';

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
