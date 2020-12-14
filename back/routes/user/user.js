const express = require('express');
const UserController = require('../../controllers/userController');

const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);

module.exports = router;
