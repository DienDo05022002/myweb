const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const UPLOAD_DIRECTORY = '../../../public/products';

// router.get('/upload', function (req, res, next) {
//   res.send('oke');
// });
// const strorage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../../../public'));
//   },
// });

// const uploadFile = multer({
//   storage: strorage,
// });

// router.post(
//   '/upload/product/:id',
//   uploadFile.single('file'),
//   function (req, res) {
//     const productId = req.params.id;
//     const publicUrl = `${req.protocol}://${req.hostname}:3010/upload/product/${productId}/${req.file.filename}`;
//     res.status(200).json({ ok: true, publicUrl: publicUrl, file: req.file });
//   }
// );
//===================================


var upload = multer({
  storage: multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../../../public/products'));
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    },
  }),
}).single('file');

router.post('/upload/product', function (req, res, next) {
  upload(req, res, function (err) {
    console.log(req.params.id)
    console.log(req.body)
    if (err instanceof multer.MulterError) {
      res.status(500).json({ type: 'Multer-Error', err: err });
    } else if (err) {
      res.status(500).json({ type: 'UnknownError', err: err });
    } else {
      const productId = req.params.id;

      console.log('productId:', productId);
      const publicUrl = `${req.protocol}://${req.hostname}:3010/products/${req.file.filename}`;
      res.status(200).json({ ok: true, publicUrl: publicUrl, file: req.file });
    }
  });
});
router.get('/get' , function (req, res, next) {
  res.json('next')
})


module.exports = router;
// const express = require("express");
// const route = express.Router();
// const upload = require('../middlewares/multerUpload');
// const {uploadFile, uploadMultiFile} = require('../controllers/uploadControllers');

// route.post("/upload", upload.single("file"), uploadFile);

// route.post("/multi", upload.array("multi", 10), uploadMultiFile);

// route.post(
//   '/upload/product',
//   upload.single("file"),
//   function (req, res) {
//     const productId = req.params.id;
//     const publicUrl = `${req.protocol}://${req.hostname}:3010/upload/product/${productId}/${req.file.filename}`;
//     res.status(200).json({ ok: true, publicUrl: publicUrl, file: req.file });
//   }
// );

// module.exports = route;