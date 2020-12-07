const { Router } = require('express');
const router     = Router();
const authControl  = require('../controller/auth.controller');
const userControl  = require('../controller/user.controller');
const postControl  = require('../controller/post.controller');

router.route('/posts/new/:userId')
      .post(authControl.requireSignin, postControl.create)

router.route('/posts/photo/:postId')
      .get(postControl.photo)

router.route('/posts/by/:userId')
      .get(authControl.requireSignin, postControl.listByUser)

router.route('/posts/feed/:userId')
      .get(postControl.listNewsFeed)

router.route('/posts/like')
      .put(authControl.requireSignin, postControl.like)
router.route('/posts/unlike')
      .put(authControl.requireSignin, postControl.unlike)

router.route('/posts/comment')
      .put(authControl.requireSignin, postControl.comment)
router.route('/posts/uncomment')
      .put(authControl.requireSignin ,postControl.uncomment)

router.route('/posts/:postId')
      .delete(authControl.requireSignin, postControl.isPoster, postControl.remove)
    
router.param('userId', userControl.userByID)
router.param('postId', postControl.postByID)

module.exports = router;