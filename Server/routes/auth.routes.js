const { Router } = require('express');
const router     = Router();
const auth       = require('../controller/auth.controller');

router.route('/signup')
    .post(auth.signup)

router.route('/login')
    .post(auth.login)

router.route('/logout')
    .post(auth.logout)

router.route('/loggedin')
    .get(auth.loggedin)

module.exports = router;