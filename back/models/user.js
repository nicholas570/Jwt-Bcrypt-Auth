require('dotenv').config();
const connection = require('../database/conf');

const UserModel = {};

UserModel.create = (user, cb) => {
  const query = 'INSERT INTO user SET ?';

  return connection.query(query, [user], (err, result) => {
    cb(err, result);
  });
};

UserModel.getOneWithId = (id, cb) => {
  const query = 'SELECT * FROM user WHERE id = ?';
  return connection.query(query, [id], (err, result) => {
    cb(err, result);
  });
};

UserModel.getOneWithHash = (email, cb) => {
  const query = 'SELECT * FROM user WHERE email = ?';
  return connection.query(query, [email], (err, result) => {
    cb(err, result);
  });
};

module.exports = UserModel;
