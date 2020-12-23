require('dotenv').config();
const connection = require('../database/conf');

const PostModel = {};

PostModel.getAll = (email, cb) => {
  const query =
    'SELECT content FROM post JOIN user On post.user_id = user.id WHERE email = ?';

  return connection.query(query, [email], (err, result) => {
    console.log(email);
    cb(err, result);
  });
};

module.exports = PostModel;
