var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/ordersModel');
const verifyToken = require('../middlewares/verifyToken');

router.post('/orders', verifyToken, async (req, res, next) => {
  console.log('bác bảo vệ');
  const { user, customerOders, customerInformation, methodPay } = req.body;
  try {
    const newOrders = new Orders({
      user,
      customerOders,
      customerInformation,
      methodPay,
      userId: req.userId,
    })

    await newOrders.save()
    res.json({ success: true, message: 'Create new Orders!', newOrders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/orders/text', function (req, res, next) {
  res.send('success-oke');
});
module.exports = router;
