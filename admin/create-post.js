var express = require('express');
var router = express.Router();
var topicService = require('../service/topicService');

/* GET create post page. */
router.get('/admin/create-post', async function (req, res, next) {
  const userDetail = req.user;
  const topics = await topicService.findAll();
  const topicOptions = [null, ...topics];
  res.render('create-post', { topics, topicOptions, userDetail });
});

module.exports = router;