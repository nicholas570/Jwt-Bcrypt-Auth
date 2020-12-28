const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (user, secretoken) =>
    jwt.sign(user, secretoken, { expiresIn: '10s' }),
  generateRefreshToken: (user, secretRefreshToken) =>
    jwt.sign(user, secretRefreshToken),
};
