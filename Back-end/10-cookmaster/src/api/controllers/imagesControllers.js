const path = require('path');
const { success } = require('../utils/dictionary/statusCode');

const getImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const imagePath = path.join(__dirname, '..', '..', 'uploads/', `${id}`);

    return res.status(success).sendFile(imagePath);
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getImage,
};
