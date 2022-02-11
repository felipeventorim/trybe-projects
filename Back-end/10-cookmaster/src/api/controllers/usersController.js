const usersService = require('../services/usersService');

const { created } = require('../utils/dictionary/statusCode');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    const newUser = { name, email, password };
    
    const { _id, role } = await usersService.createUser(newUser);
  
    const createdUser = { _id, role, name, email };
  
    res.status(created).json({ user: createdUser });
  } catch (error) {
    console.log(`POST CREATEUSER => ${error.message}`);
    next(error);
  }
};

module.exports = {
  createUser,
};
