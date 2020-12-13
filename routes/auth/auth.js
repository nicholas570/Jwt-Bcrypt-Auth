const express = require('express');
const connection = require('../../database/conf');

const router = express.Router();

router.post('/register', (req, res) => {
  const data = req.body;
  const sql = 'INSERT INTO user SET ?';

  return connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    return connection.query(
      'SELECT * FROM user WHERE id = ?',
      results.insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const newUser = records[0];
        return res.status(201).json(newUser);
      }
    );
  });
});

module.exports = router;
