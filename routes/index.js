var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Mater Dei - Swim Time Tracker"
  });
});

module.exports = router;
