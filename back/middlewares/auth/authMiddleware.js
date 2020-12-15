const { check, validationResult } = require('express-validator');

const authMiddlewares = {
  validateRegistrationDatas: [
    check('email').isEmail().withMessage('Email not valid'),
    check('firstName')
      .isLength({ min: 2 })
      .withMessage('must be at least 2 chars long'),
    check('lastName')
      .isLength({ min: 2 })
      .withMessage('must be at least 2 chars long'),
    check('password', 'The password must be 5+ chars long and contain a number')
      .not()
      .isIn(['123', 'password', 'god'])
      .withMessage("N' utilisez pas un nom commun")
      .isLength({ min: 5 })
      .matches(/\d/),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'Something went wrong',
          data: {},
          error: `${errors.array()[0].param} ${errors.array()[0].msg}`,
        });
      }
      return next();
    },
  ],
};

module.exports = authMiddlewares;
