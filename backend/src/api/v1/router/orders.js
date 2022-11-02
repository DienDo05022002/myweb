var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/ordersModel');
const OrderDetail  = require('../models/orderDetailModel')
const TextOrder = require('../models/textOrderModel');
const verifyToken = require('../middlewares/verifyToken');

router.post('/orders', verifyToken, async (req, res, next) => {
  console.log('bác bảo vệ');
  const { user, customerOders,customerInformation,methodPay,totalOrders } = req.body;
  // , customerOders,customerInformation,methodPay,totalOrders
  try {
    const newOrders = new Orders({
      user,
      customerOders,
      customerInformation,
      methodPay,
      totalOrders,
      userId: req.userId
    })
    await newOrders.save()
    // const newOrderDetail = new OrderDetail({
    //   oderId: newOrders._id,
    //   userId: req.body.users,
    //   products: req.body.products,
    // });

    // await newOrderDetail.save();

    res.json({ success: true, message: 'Create new Orders!',userId: newOrders.userId, newOrders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.get('/orders', verifyToken, async (req, res, next) => {
  const _id = req.params.id;
  try {
    const order = await Orders.findOne({ _id: _id });

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
});





// router.get('/History-orders', async (req, res, next) => {
//   try {
//       const historyOrders = await Orders.find({ "category": "single" })//.populate('user')
//       res.json({historyOrders })
//   } catch (error) {
//       console.log(error)
//       res.status(500).json({ success: false, message: 'Internal server error' })
//   }
// });
router.get('/History-orders', verifyToken, async (req, res, next) => {
  try {
      const orders = await Orders.find({ userId: req.userId })//.populate('users')
      // res.json({ orders })
      res.json(orders)
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
});


router.post('/textorder', verifyToken, async (req, res, next) => {
  console.log('bác bảo vệ');
  const { user } = req.body;
  try {
    const newOrders = new Orders({
      user,
      userId: req.userId
    })
    await newOrders.save()
    res.json({ success: true, message: 'Create new Orders!',userId:newOrders.userId, newOrders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.get('/textorder', verifyToken, async (req, res, next) => {
  console.log('bác bảo vệ');
  try {
    const newTextOrder = await TextOrder.find()
    console.log(req.userId)
    res.json({ success: true, message: 'Create new TextOrder!', newTextOrder });


  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/orders/text', function (req, res, next) {
  res.send('success-oke');
});
module.exports = router;
