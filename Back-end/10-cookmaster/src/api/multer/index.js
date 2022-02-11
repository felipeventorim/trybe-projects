const multer = require('multer');
const path = require('path');

const pathImages = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, pathImages),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

module.exports = upload;
