const User = require('../models/userModel');
const Product = require('../models/productModel');
const Orders = require('../models/ordersModel');
const Category = require('../models/categoryModel')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

var express = require('express');
var router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const cloudinary = require('../middlewares/cloudinary');

router.get('/getAllUsers/text', function (req, res, next) {
  res.send('v1/users');
});

router.get('/getAllUsers', async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const total = await User.countDocuments({ roleId: 'user' });
  const sort = '-createdAt';
  try {
    const users = await User.find({ roleId: 'user' })
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
      message: 'Server not found !!!',
    });
  }
});

router.get('/getUsers/:id', async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).select(
      '-password'
    );
    if (users) {
      return res.json({
        success: true,
        user: users,
      });
    }
    return res.json({
      success: true,
      message: 'User not found.',
      user: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});


//================== Đổi mật khẩu người dùng========================================================================
// =================================================================================================================
router.patch('/updataUsers/:id', async (req, res, next) => {
  // const conditionUpdate = { _id: req.params.id };
  const { id } = req.params;
  const { password } = req.body;
  console.log(req.body)
  if (!password)
  return res
    .status(400)
    .json({ error: { name: err.name, messgae: 'Enter password' } });

  const hashPassword = await argon2.hash(password)
  console.log(hashPassword)
  try {
    const checkUpdate = await User.findOneAndUpdate(
      id, 
      {password: hashPassword},
      {
        new: true,
      }
    );
    if (!checkUpdate) {
      return res.status(401).json({
        success: false,
        message: 'Update password user failed',
      });
    }
    const accessToken = jwt.sign(
      { userId: checkUpdate._id},
      process.env.ACCESS_TOKEN
    );

    return res.status(200).json({
      success: true,
      message: 'Update user successfully !!!',
      newPassword: password,
      accessToken
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});

router.delete('/deleteUsers/:id', async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deleteUser) {
      return res.status(401).json({
        success: false,
        message: 'Delete user failed',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Delete user successfully !!!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//   product
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
router.get('/admin/getProducts', async (req, res, next) => {
  const sort = '-createdAt';
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 50;
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

router.get('/admin/getByIdProducts/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product)
      return res.status(500).json({
        success: false,
        message: 'Product not found !',
      });

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});

router.post(
  '/admin/postProducts',
  cloudinary.single('file'),
  async (req, res, next) => {
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
  }
);

router.patch('/admin/updataProducts/:id', async (req, res, next) => {
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
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Product.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: 'Product not found or account not authorised',
      });
    // await updatedPost.save()
    res.json({
      success: true,
      message: 'Excellent progress!',
      updata: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Internal server errorLL' });
  }
});

router.delete(
  '/admin/deleteProduct/:id',
  verifyAdmin,
  async (req, res, next) => {
    try {
      const deleteProduct = await Product.findOneAndDelete({
        _id: req.params.id,
      });
      if (!deleteProduct) {
        return res.status(401).json({
          success: false,
          message: 'Delete product failed',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Delete product successfully !!!',
        deleteProduct: deleteProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Server not found !!!',
      });
    }
  }
);

//------------------- Set status product------------------------------------------------------------------------------------------------------------------
router.patch('/admin/setStatusProduct/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active, rollTop } = req.body;
    console.log(req.body);
    const checkUpdate = await Product.findByIdAndUpdate(
      id,
      {
        active: active,
        rollTop: rollTop,
      },
      { new: true }
    );
    return res.status(200).json({
      id: id,
      setStatus: { active, rollTop },
      updataStatus: checkUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id };
    const deletedPost = await Product.findOneAndDelete(postDeleteCondition);

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorised',
      });

    res.json({ success: true, post: deletedPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Internal server errorLLL' });
  }
  //________________
  // try {
  //     const { id } = req.params;
  //     const deletedPost = await deleteDocument(id);
  //     res.json({ ok: true, deletedPost });
  // } catch (error) {
  //     res.status(500).json(error);
  // }
});

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//   Orders
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

router.get('/admin/getAllOrders', async (req, res, next) => {
  // const sort = "-createdAt";
  const sort = { createdAt: -1 };
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 50;
  const skip = (page - 1) * limit;
  const total = await Orders.countDocuments();
  try {
    const order = await Orders.find().sort(sort).skip(skip).limit(limit);
    res.json({
      success: true,
      totalPage: Math.ceil(total / limit),
      totalOrder: total,
      order,
    });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});

router.get('/admin/getOrderById/:id', async (req, res, next) => {
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
      message: 'Server not found!',
    });
  }
});

// router.patch('/admin/updataOrder/:id', async (req, res, next) => {
// 	try {
// 		const postUpdateCondition = { _id: req.params.id }
//     const data = req.body;

// 		const updatedPost = await Orders.findOneAndUpdate(
//       postUpdateCondition,
// 			data,
// 			// { new: true }
// 		)
//     // await updatedPost.save()
// 		res.json({
// 			success: true,
// 			message: 'Excellent progress!',
//       user:postUpdateCondition,
// 			updata: updatedPost
// 		})
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server errorLL' })
// 	}
// });

router.patch('/admin/updataOrder/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPaid, isDelivered } = req.body;
    console.log(req.body);
    const checkUpdate = await Orders.findByIdAndUpdate(
      id,
      {
        isPaid: isPaid,
        isDelivered: isDelivered,
      },
      { new: true }
    );
    return res.status(200).json({
      id: id,
      up: { isPaid, isDelivered },
      updata: checkUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});

// Get Order Today
router.get('/admin/getAllOrdersToday', async (req, res, next) => {
  // const sort = "-createdAt";
  const sort = { createdAt: -1 };
  // const page = +req.query.page || 1;
  // const limit = +req.query.limit || 50;
  // const skip = (page - 1) * limit;
  // const total = await Orders.countDocuments();
  const today = new Date();
  const eqDay = {
    $eq: [{ $dayOfMonth: '$createdAt' }, { $dayOfMonth: today }],
  };
  const eqMonth = { $eq: [{ $month: '$createdAt' }, { $month: today }] };

  const query = {
    $expr: {
      $and: [eqDay, eqMonth],
    },
  };
  try {
    const order = await Orders.find({ createdAt: query }); //.sort(sort)//.skip(skip).limit(limit);
    res.json({
      query: { query },
      success: true,
      // totalPage: Math.ceil(total / limit),
      // totalOrder: total,
      order,
    });
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//   category
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

router.get('/admin/category/:category', async (req, res, next) => {
  try {
    const product = await Product.find({ category: req.params.category });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});
router.get('/admin/getCategoy', async (req, res, next) => {
  const total = await Product.countDocuments();
  try {
    const product = await Product.find().distinct('category');
    res.json({ totalCategory: total, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.get('/admin/getAllCategory', async (req, res, next) => {
  const total = await Category.countDocuments();
  try {
    const category = await Category.find()
    res.json({ totalCategory: total, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post('/admin/createCategory', async (req, res, next) => {
  const {categories, description} = req.body
  if(!categories) 
  return res.status(400).json({success: false, message: 'Not categories'})
  try {
    const newCategory = new Category({
      categories, description,
    })
    await newCategory.save();
    res.json({success: true, message: 'successfully', newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.delete('/deleteCategory/:id', verifyAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteCategory = await Category.findOneAndDelete({ _id: req.params.id });
    if (!deleteCategory) {
      return res.status(401).json({
        success: false,
        message: 'Delete Category failed',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Delete Category successfully !!!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server not found !!!',
    });
  }
});
module.exports = router;
