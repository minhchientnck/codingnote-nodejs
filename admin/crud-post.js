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
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  }
  let refId = await postService.max('reference_id');
  refId++;
  const referenceTitle = `${refId}-${joinWord(req.body.title)}`
  let selectedTopic;
  if (req.body.topic){
    selectedTopic = await topicService.findById(req.body.topic);
  }
  Post.build({
    title: req.body.title,
    referenceId: refId,
    referenceTitle,
    content: req.body.content,
    topicId: req.body.topic,
    createdDate: new Date(),
    updatedDate: null,
  })
  .save()
  .then(function(anotherTask) {
    console.log('Saved successfully');
    if(req.body.topic) {
      res.redirect(`/${selectedTopic.name}/${referenceTitle}`)
    }
    res.redirect(`/${referenceTitle}`)
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
  res.render('admin/update-post', { topics, topicOptions, userDetail, post });
});

router.post('/update/:postId', async function (req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  }
  const postId = req.params['postId'];
  let refId = await postService.max('reference_id');
  const referenceTitle = `${refId}-${joinWord(req.body.title)}`;
  let topicId = req.body.topic;
  const topic = await topicService.findById(topicId);
  Post.update({
    title: req.body.title,
    referenceTitle,
    content: req.body.content,
    topicId,
    updatedDate: new Date(),
  }, {
    where: { id: postId }
  }).then(result => {
    console.log('Updated successfully')
    if(topic) {
      res.redirect(`/${topic.name}/${referenceTitle}`)
    }
    res.redirect(`/${referenceTitle}`)
  })
  .catch(error =>
    console.log(error)
  );
});

router.post('/delete/:postId', async function (req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/login');
  }
  const postId = req.params['postId'];
  const prevPost = await postService.findOneAndTopic(postId);
  const topic = prevPost.topic;
  Post.destroy({
    where: { id: postId }
  }).then(result => {
    console.log('Deleted successfully');
    if(topic) {
      res.redirect(`/${topic.name}`)
    }
    res.redirect('/');
  })
  .catch(error =>
    console.log(error)
  );
});

module.exports = router;