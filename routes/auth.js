const express = require('express');

const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');

// user controllers
const { createOrUpdateUser, getCurrentUser, checkUserRole, getUsers, registerRestaurant, getCurrentRestaurant, getRestaurants, getRestaurant, getRestaurantsByZip, modifyRestaurantStatus, createOrUpdateCuisine, getCuisine, getUserCuisines, deleteCuisine, createOrUpdateCart, getCart, createOrder, getOrders, getOrdersByDriver, getOrdersByRestaurant, getOrdersByUser, getUsersByRole, modifyOrderStatus } = require('../controllers/auth');
const { uploadImage, removeImage } = require('../controllers/images');

router.post('/createOrUpdateUser', authCheck, createOrUpdateUser);
router.post('/checkUserRole', checkUserRole);
router.post('/getCurrentUser', authCheck, getCurrentUser);
router.get('/getUsers', authCheck, adminCheck, getUsers);
router.post('/uploadimages', uploadImage);
router.post('/removeimage', removeImage)
router.post('/registerRestaurant', authCheck, registerRestaurant);
router.post('/getCurrentRestaurant', authCheck, getCurrentRestaurant);
router.get('/getRestaurants', authCheck, adminCheck, getRestaurants);
router.post('/getRestaurantsByZip', getRestaurantsByZip);
router.post('/getRestaurant', authCheck, getRestaurant);
router.post('/modifyRestaurantStatus', authCheck, adminCheck, modifyRestaurantStatus);
router.post('/createOrUpdateCuisine', authCheck, createOrUpdateCuisine);
router.post('/getCuisines', getUserCuisines);
router.post('/getCuisine', authCheck, getCuisine);
router.post('/deleteCuisine', authCheck, deleteCuisine);
router.post('/createOrUpdateCart', authCheck, createOrUpdateCart);
router.post('/getCart', authCheck, getCart);
router.post('/createOrder', authCheck, createOrder);
router.get('/getOrders', getOrders);
router.post('/getOrdersByRestaurant', authCheck, getOrdersByRestaurant);
router.post('/getOrdersByDriver', authCheck, getOrdersByDriver);
router.post('/getOrdersByUser', authCheck, getOrdersByUser);
router.post('/getUsersByRole', authCheck, getUsersByRole);
router.post('/modifyOrderStatus', authCheck, modifyOrderStatus);

module.exports = router;
