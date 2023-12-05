const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // ensure this folder exists 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage }); 

module.exports = upload;