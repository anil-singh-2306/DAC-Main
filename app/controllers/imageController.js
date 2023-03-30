const service = require('../services/imageService');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/client_1001/user/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

// Multer filter configuration
const fileFilter = (req, file, cb) => {
    // Only allow certain file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, and GIF files are allowed.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('profile_picture');

exports.updateProfile = async (req, res, next) => {
    try {
        await upload(req, res, async (err) => {
            if (err) {
                throw new Error('Error uploading file: ' + err.message);
            }

            const { id } = req.params;
            const { filename } = req.file;

            const result = await service.updateProfile(id, filename);
            
            res.status(200).json({
                success: true,
                data: result,
                message: 'Profile picture updated successfully'
            });
        });
    } catch (err) {
        console.error(err);

        const message = err.message || 'An unknown error occurred';

        res.status(400).json({
            success: false,
            message: message
        });
    }
};