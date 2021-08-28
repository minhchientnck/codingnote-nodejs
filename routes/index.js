var express = require('express');
var router = express.Router();
var topicService = require('../service/topicService');
var postService = require('../service/postService');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const userDetail = req.user;
  const topics = await topicService.findAll();
  const posts = await postService.findAll();
  res.render('index', { topics, posts, userDetail });
});

module.exports = router;
