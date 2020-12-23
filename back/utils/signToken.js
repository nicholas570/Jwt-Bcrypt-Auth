const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (user, secretoken) =>
    jwt.sign(user, secretoken, { expiresIn: '10m' }),
  generateRefreshToken: (user, secretRefreshToken) =>
    jwt.sign(user, secretRefreshToken),
};
