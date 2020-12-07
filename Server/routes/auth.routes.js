const { Router } = require('express');
const router     = Router();
const authControl  = require('../controller/auth.controller');
const passport = require("passport");
const jwt        = require('jsonwebtoken');
const User       = require('../models/user.model');


router.route('/signup')
    .post(authControl.signup)

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, failureDetails) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Something went wrong authenticating user" });
        return;
      }
  
      if (!user) {
        res.status(401).json(failureDetails);
        return;
      }

      const token = jwt.sign({
        _id: user._id
      }, process.env.JWT_SECRET)
  
      res.cookie("t", token, {
        expire: new Date() + 9999
      })
  
      return res.status(200).json({
        token,
        user: {_id: user._id, name: user.name, email: user.email}
      })
    })(req, res, next);
  })
  
router.route('/logout')
    .post(authControl.logout)

module.exports = router;


