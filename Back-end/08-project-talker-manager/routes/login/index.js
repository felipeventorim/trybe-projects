const express = require('express');
const { getToken, validateEmail, validatePassword } = require('../../middlewares');

const router = express.Router();

router.post('/', validateEmail, validatePassword, getToken);

module.exports = router;
