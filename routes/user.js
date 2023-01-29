const UserController = require('../controllers/user_controller');
const OrderController = require('../controllers/order_controller');
const middleware = require('../config/middleware');
 
const express = require('express');

const router = express.Router();

router.post('/add-user', UserController.Signup);
router.post('/login-user', UserController.signIn);

router.post('/add-order', OrderController.addOrder);
router.get('/get-order/:id', OrderController.getOrder);


module.exports = router;