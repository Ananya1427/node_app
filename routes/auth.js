const express = require('express');

const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');

// user controllers
const { createOrUpdateUser, getCurrentUser, checkUserRole, getUsers } = require('../controllers/auth');

router.post('/createOrUpdateUser', authCheck, createOrUpdateUser);
router.post('/checkUserRole', checkUserRole);
router.post('/getCurrentUser', authCheck, getCurrentUser);
router.get('/getUsers', authCheck, adminCheck, getUsers);

module.exports = router;
