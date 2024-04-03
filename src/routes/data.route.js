var express = require('express');
const { getLists } = require('../controllers/data.controller');
var router = express.Router();

router.get("/", getLists)

module.exports = router;
