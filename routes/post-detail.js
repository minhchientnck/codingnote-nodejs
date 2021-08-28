var express = require('express');
var router = express.Router();
var topicService = require('../service/topicService');
var postService = require('../service/postService');
const { findRelativePostAndTopic } = require('../service/postService');

/* GET post detail page. */
router.get('/:topic/:ref', async function (req, res, next) {
  const userDetail = req.user;
  const topics = await topicService.findAll();
  let topicName = req.params['topic'];
  const referenceTitle = req.params['ref'];
  let post;
  if (topicName === 'default') {
    post = await postService.findByReferenceTitle(referenceTitle);
  } else {
    post = await postService.findByReferenceTitleAndTopic(referenceTitle, topicName);
  }
  if (!post) {
    res.render('404', { topics });
    return;
  }
  console.log(post);
  const relativePosts = await findRelativePostAndTopic(post.id, post.topicId);
  const selectedTopic = await topicService.findByName(topicName);
  res.render('post-detail', { topics, post, relativePosts, selectedTopic, userDetail });
});

module.exports = router;