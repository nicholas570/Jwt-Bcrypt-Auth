const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
      error,
    });
  }
};
