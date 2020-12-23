const jwt = require('jsonwebtoken');

module.exports = (user, secretoken) => {
  const accessToken = jwt.sign(user, secretoken);
  return accessToken;
};
