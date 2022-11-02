var express = require('express');
var router = express.Router();
const Product = require('../models/productModel');
const Main = require('../models/mainModel');
const path = require('path');
const upload = require('../middlewares/multerUpload');
const cloudinary = require('../middlewares/cloudinary')
const verifyToken = require('../middlewares/verifyToken');
// MULTER UPLOAD
const multer = require('multer');

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
router.get('/product/slug/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
router.get('/product/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//GET IMAGES
router.post('/main/product', async (req, res, next) => {
  const data = req.body;
  try {
    const product = new Product(data);
    await product.save();

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
router.post('/products', cloudinary.single('file'), async (req, res, next) => {
  const file = req.file;
  // const data = req.body;
  const {
    name,
    slug,
    category,
    image,
    price,
    discount,
    countIn,
    rating,
    numReviews,
    description,
  } = req.body;
  const product = new Product({
    name,
    slug,
    category,
    image: file?.path,
    price,
    discount,
    countIn,
    rating,
    numReviews,
    description,
  });
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  await product.save();
  res.status(201).json({ file: req.file, product });
});

//------------------------------------------------------------------------------------------------------------------------------
//   Get By Category
//------------------------------------------------------------------------------------------------------------------------------

router.get('/Category-combo', async (req, res, next) => {
  try {
      const product = await Product.find({ "category": "combo" })//.populate('user')
      res.json({product })
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
});
router.get('/Category-single', async (req, res, next) => {
  try {
      const product = await Product.find({ "category": "single" })//.populate('user')
      res.json({product })
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
});
module.exports = router;