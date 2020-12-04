const { Router } = require('express');
const router     = Router();
const authControl  = require('../controller/auth.controller');
const userControl  = require('../controller/user.controller');
const postControl  = require('../controller/post.controller');

router.route('/posts/new/:userId')
      .post(authControl.loggedin, postControl.create)

router.route('/api/posts/photo/:postId')
      .get(postControl.photo)

router.route('/posts/feed/:userId')
      .get(authControl.loggedin, postControl.listNewsFeed)

router.route('/posts/like')
      .put(authControl.loggedin, postControl.like)
router.route('/posts/unlike')
      .put(authControl.loggedin, postControl.unlike)

router.route('/posts/comment')
      .put(authControl.loggedin, postControl.comment)
router.route('/posts/uncomment')
      .put(authControl.loggedin, postControl.uncomment)

router.route('/posts/:postId')
      .delete(authControl.loggedin, postControl.isPoster, postControl.remove)
    
router.param('userId', userControl.userByID)
router.param('postId', postControl.postByID)

module.exports = router;