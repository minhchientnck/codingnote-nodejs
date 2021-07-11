var express = require('express');
var router = express.Router();
var topicService = require('../service/topicService');
var postService = require('../service/postService');

const topicName = 'thu-thuat';
/* GET thu-thuat page. */
router.get('/', async function (req, res, next) {
  const userDetail = req.user;
  const topics = await topicService.findAll();
  const selectedTopic = await topicService.findByName(topicName);
  const posts = await postService.findByTopicName(topicName);
  res.render('index', { topics, posts, selectedTopic, userDetail });
});

module.exports = router;
