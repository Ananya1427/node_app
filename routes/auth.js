const express = require('express');

const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');

// user controllers
const { createOrUpdateUser, getCurrentUser, checkUserRole, getUsers } = require('../controllers/auth');
const { uploadImage, removeImage } = require('../controllers/images');

router.post('/createOrUpdateUser', authCheck, createOrUpdateUser);
router.post('/checkUserRole', checkUserRole);
router.post('/getCurrentUser', authCheck, getCurrentUser);
router.get('/getUsers', authCheck, adminCheck, getUsers);
router.post('/uploadimages', uploadImage);
router.post('/removeimage', removeImage)

module.exports = router;
