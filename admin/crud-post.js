var express = require('express');
var router = express.Router();
var topicService = require('../service/topicService');
var postService = require('../service/postService');
var Post = require('../model/post');
var { joinWord } = require('../utils');

/* GET create post page. */
router.get('/create', async function (req, res, next) {
  const userDetail = req.user;
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  }
  const topics = await topicService.findAll();
  const topicOptions = [null, ...topics];
  res.render('admin/create-post', { topics, topicOptions, userDetail });
});

router.post('/create', async function (req, res, next) {
  const userDetail = req.user;
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  }
  const topics = await topicService.findAll();
  const posts = await postService.findAll();
  let count = await postService.count();
  count++;
  Post.build({
    title: req.body.title,
    referenceId: count,
    referenceTitle: `${count}-${joinWord(req.body.title)}`,
    content: req.body.content,
    topicId: req.body.topic,
    createdDate: new Date(),
    updatedDate: null,
  })
  .save()
  .then(function(anotherTask) {
    console.log('Saved successfully');
    res.render('index', { topics, posts, userDetail});
  }).catch(function(error) {
    console.log(error);
  });
});

router.get('/update', async function (req, res, next) {
  const userDetail = req.user;
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  }
  const topics = await topicService.findAll();
  const topicOptions = [null, ...topics];
  const postId = req.query.postId;
  let post = {};
  if (postId) {
    post = await postService.findOne(postId);
  }
  console.log(post);
  res.render('admin/update-post', { topics, topicOptions, userDetail, post });
});

module.exports = router;