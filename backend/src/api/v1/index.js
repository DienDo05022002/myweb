const express = require('express');
var router = express.Router();

router.use(require('./router/user'))
router.use(require('./router/product'))
router.use(require('./router/upload'))
router.use(require('./router/orders'))

module.exports = router;