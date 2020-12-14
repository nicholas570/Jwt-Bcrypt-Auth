const express = require('express');
const connection = require('../../database/conf');

const router = express.Router();

router.post('/register', (req, res) => {
  const data = req.body;
  const sql = 'INSERT INTO user SET ?';

  return connection.query(sql, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        data: {},
        error: err.message,
      });
    }
    return connection.query(
      'SELECT * FROM user WHERE id = ?',
      results.insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: err2.message,
          });
        }
        const newUser = records[0];
        return res.status(201).json({
          success: true,
          message: 'Successfully registered',
          data: newUser,
          error: '',
        });
      }
    );
  });
});

module.exports = router;
