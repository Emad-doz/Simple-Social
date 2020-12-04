const { Router } = require('express');
const router     = Router();
const authControl  = require('../controller/auth.controller');
const userControl  = require('../controller/user.controller');

router.route('/users')
      .get(userControl.list)

router.route('/users/:userId')
      .get(authControl.loggedin, userControl.read)
      .put(authControl.loggedin, userControl.update)
      .delete(authControl.loggedin, userControl.remove)

router.route('/users/photo/:userId')
      .get(userControl.photo, userControl.defaultPhoto)
router.route('/users/defaultphoto')
      .get(userControl.defaultPhoto)

router.route('/users/findpeople/:userId')
      .get(authControl.loggedin, userControl.findPeople)

router.route('/users/follow')
      .put(authControl.loggedin, userControl.addFollowing, userControl.addFollower)
router.route('/users/unfollow')
      .put(authControl.loggedin, authControl.loggedin, userControl.removeFollowing, userControl.removeFollower)

router.param('userId', userControl.userByID)

module.exports = router;