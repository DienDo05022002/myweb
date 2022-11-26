var express = require('express');
var router = express.Router();
const Product = require('../models/productModel');
const Main = require('../models/mainModel');
const path = require('path');
const upload = require('../middlewares/multerUpload');
const cloudinary = require('../middlewares/cloudinary')
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin')
// MULTER UPLOAD
const multer = require('multer');

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find({active: 'on'});
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});

//Pagination 
const PAGE_LIMIT = 8
router.get('/pagination/products', async (req, res, next) => {
  const sort = {createdAt: -1}
  const page = req.query.page || 1;
  const total = await Product.countDocuments();
  // const skip = (page - 1) * PAGE_LIMIT;
  if(page) {
    const skip = (page - 1) * PAGE_LIMIT;
    try {
      const products = await Product.find({active: 'on'}).sort(sort).skip(skip).limit(PAGE_LIMIT)
      res.json({
        success: true,
        numberPageNow: page,
        endPage: Math.ceil(total / PAGE_LIMIT),
        products: products
      });
    } catch (err) {
      res.status(400).json({ error: { name: err.name, messgae: err.message } });
    }
  } else {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(400).json({ error: { name: err.name, messgae: err.message } });
    } 
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
// Comment and review 
router.patch('/product/review/:slug', async (req, res, next) => {
  const { slug } = req.params.slug;
  try {
    const review = {
      name: req.body.name,
      comment: req.body.comment,
      // userId: req.userId
    };
    console.log("param:"+req.params)
    console.log("body:"+req.body)

    const addReview = await Product.findOneAndUpdate(
      slug,
      {$push: {reviews: review}},
      { new: true }
    );
    return res.status(200).json({
      success: true,
      slug: slug,
      addReview
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
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
  const {
    name,
    slug,
    category,
    price,
    discount,
    countIn,
    rating,
    numReviews,
    description,
    
  } = req.body;
  // const product = new Product({
  //   name,
  //   slug,
  //   category,
  //   image: file?.path,
  //   price,
  //   discount,
  //   countIn,
  //   rating,
  //   numReviews,
  //   description,
  // });
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  try {
    const product = new Product(
      {name, slug, category, image: file?.path, price, discount, countIn, rating, numReviews, description }
    );
    await product.save();
    res.status(201).json({ file: req.file, product });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
router.post('/admin/addProduct', async (req, res, next) => {
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
    active,
    rollTop
  } = req.body;
  const product = new Product({
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
    active,
    rollTop
  });
  if (!image) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  await product.save();
  res.status(201).json({ success: true , product });
});
//------------------------------------------------------------------------------------------------------------------------------
//   Get By Category
//------------------------------------------------------------------------------------------------------------------------------

router.get('/CategorySideBar', async (req, res, next) => {
  try {
      const product = await Product.find().distinct('category')
      res.json({product})
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
});
router.get('/Category-sideBar/category/:category', async (req, res, next) => {
  // const {type} = req.params;
  try {
      const product = await Product.find( {category: req.params.category} )
      res.json({product})
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
});

router.get('/Category-combo', async (req, res, next) => {
  try {
      const product = await Product.find({ category: "combo" })//.populate('user')
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

router.get('/search/find', async (req, res, next) => {
  const searchTerm = req.query.q;
  if (!searchTerm.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing paramaters!",
    });
  }

  try {
    const textReg = new RegExp(searchTerm, "i");
    const results = await Product.find({
      name: textReg,
    });

    return res.json({
      success: true,
      results:results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
});

router.get('/search/text', (req, res, next) => {
  const searchTerm = req.query.q;
});
//------------------------------------------------------------------------------------------------------------------------------
//   Search
//------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------
//   Get By Status
//------------------------------------------------------------------------------------------------------------------------------
router.get('/homePage/rollTop', async (req, res, next) => {
  try {
      const product = await Product.find({ rollTop: "on" })//.populate('user')
      res.json({product })
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
});

module.exports = router;