const multer  = require('multer');

const multerUpload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log('*****file****', file);
      const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];
      cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix)
    }
  });
  const upload = multer({ storage: storage});
  return upload;
}

module.exports = {
  multerUpload
}