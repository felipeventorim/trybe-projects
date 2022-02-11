const loginService = require('../services/loginService');

const { success } = require('../utils/dictionary/statusCode');

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginService.userLogin(email, password);

    res.status(success).json({ token });
  } catch (error) {
    console.log(`POST USERLOGIN => ${error.message}`);
    next(error);
  }
};

module.exports = {
  userLogin,
};
