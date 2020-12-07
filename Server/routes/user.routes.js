const { Router } = require('express');
const router     = Router();
const authControl  = require('../controller/auth.controller');
const userControl  = require('../controller/user.controller');

router.route('/users')
      .get(userControl.list)

router.route('/users/:userId')
      .get(authControl.requireSignin, userControl.read)
      .put(authControl.requireSignin, authControl.hasAuthorization, userControl.update)
      .delete(authControl.requireSignin, authControl.hasAuthorization, userControl.remove)

router.route('/users/photo/:userId')
      .get(userControl.photo, userControl.defaultPhoto)
router.route('/users/defaultphoto')
      .get(userControl.defaultPhoto)

router.route('/users/findpeople/:userId')
      .get(authControl.requireSignin, userControl.findPeople)

router.route('/users/follow')
      .put(authControl.requireSignin, userControl.addFollowing, userControl.addFollower)
router.route('/users/unfollow')
      .put(authControl.requireSignin, userControl.removeFollowing, userControl.removeFollower)

router.param('userId', userControl.userByID)

module.exports = router;