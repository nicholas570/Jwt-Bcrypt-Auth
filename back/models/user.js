require('dotenv').config();
const connection = require('../database/conf');

const UserModel = {};

UserModel.getAll = (cb) => {
  const query = 'SELECT * FROM user';
  return connection.query(query, (err, result) => {
    cb(err, result);
  });
};

UserModel.getOne = (id, cb) => {
  const query = 'SELECT * FROM user WHERE id = ?';
  return connection.query(query, [id], (err, result) => {
    cb(err, result);
  });
};

UserModel.create = (user, cb) => {
  const query = 'INSERT INTO user SET ?';

  return connection.query(query, [user], (err, result) => {
    cb(err, result);
  });
};

module.exports = UserModel;
