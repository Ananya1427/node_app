const cloudinary = require('cloudinary');

require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.EXPRESS_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.EXPRESS_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.EXPRESS_APP_CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto', // jpeg, png
        });
        if (result) {
            res.status(200).json({
                public_id: result.public_id,
                url: result.secure_url,
                message: 'Image Uploaded Successfully!'
            });
        } else {
            res.status(202).json({ message: 'Failed to Upload Image!' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.removeImage = (req, res) => {
    let image_id = req.body.public_id;
    try {
        cloudinary.uploader.destroy(image_id, (err) => {
            const { result } = err;
            if (result === 'ok') {
                res.status(200).json({
                    err,
                    message: 'Image Removed Successfully!'
                });
            } else {
                res.status(202).json({
                    err,
                    message: 'Failed to Remove Image!'
                });
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
};