const { Router } = require('express');
const router     = Router();
const authControl  = require('../controller/auth.controller');

router.route('/signup')
    .post(authControl.signup)

router.route('/login')
    .post(authControl.login)

router.route('/logout')
    .post(authControl.logout)

module.exports = router;