const User = require('../models/userModel');
const Product = require('../models/productModel');

var express = require('express');
var router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin')
const cloudinary = require('../middlewares/cloudinary')

router.get('/getAllUsers/text',verifyAdmin, function (req, res, next) {
    res.send('v1/users');
});

router.get('/getAllUsers',verifyAdmin, async (req, res, next) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments({ roleId: "user" });
    const sort = "-createdAt";
    try {
      const users = await User.find({ roleId: "user" })
        .limit(limit)
        .skip(skip)
        .sort(sort);
  
      return res.json({
        success: true,
        totalPage: Math.ceil(total / limit),
        totalUsers: total,
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server not found !!!",
      });
    }
});

router.get('/getUsers/:id',verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).select("-password");
    if (users) {
      return res.json({
        success: true,
        user: users,
      });
    }
    return res.json({
      success: true,
      message: "User not found.",
      user: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
});

router.patch('/updataUsers/:id',verifyAdmin, async (req, res, next) => {
  try {
    const conditionUpdate = { _id: req.params.id };
    const checkUpdate = await User.findOneAndUpdate(
      conditionUpdate,
      req.body,
      {
        new: true,
      }
    );
    if (!checkUpdate) {
      return res.status(401).json({
        success: false,
        message: "Update user failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Update user successfully !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
});

router.delete('/deleteUsers/:id', verifyAdmin, async (req, res, next) => {
    try {
      const deleteUser = await User.findOneAndDelete({ _id: req.query.id });
      if (!deleteUser) {
        return res.status(401).json({
          success: false,
          message: "Delete user failed",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Delete user successfully !!!",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server not found !!!",
      });
    }
});


//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//   product
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
router.get('/admin/getProducts', verifyAdmin, async (req, res, next) => {
  const sort = "-createdAt";
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments();
  try {
    const products = await Product.find().sort(sort).skip(skip).limit(limit);
    res.json({ 
      success: true,
      totalPage: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});

router.get('/admin/getByIdProducts/:id', verifyAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product)
      return res.status(500).json({
        success: false,
        message: "Product not found !",
      });

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
});

router.post('/admin/postProducts', cloudinary.single('file'), async (req, res, next) => {
  const file = req.file;
  const {
    name,
    slug,
    category,
    // image,
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

router.patch('/admin/updataProducts/:id',verifyAdmin, async (req, res, next) => {
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

	try {
		let updatedPost = {    
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
		}

		const postUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Product not found or account not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server errorLL' })
	}
});

router.delete('admin/deleteProduct/:id', verifyAdmin, async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.query.id });
    if (!deleteUser) {
      return res.status(401).json({
        success: false,
        message: "Delete product failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete product successfully !!!",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
});
module.exports = router;