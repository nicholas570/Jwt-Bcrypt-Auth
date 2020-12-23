require('dotenv').config();
const connection = require('../database/conf');

const PostModel = {};

PostModel.getAll = (email, cb) => {
  const query =
    'SELECT content, post.id FROM post JOIN user On post.user_id = user.id WHERE email = ?';

  return connection.query(query, [email], (err, result) => {
    cb(err, result);
  });
};

module.exports = PostModel;
