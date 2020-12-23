const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (user, secretoken) => jwt.sign(user, secretoken),
  generateRefreshToken: (user, secretRefreshToken) =>
    jwt.sign(user, secretRefreshToken),
};
