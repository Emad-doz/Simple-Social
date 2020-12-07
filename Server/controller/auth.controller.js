require('dotenv').config()
const bcrypt     = require('bcrypt');
const User       = require('../models/user.model');
const expressJwt = require('express-jwt');


const signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      res.status(400).json({ message: "Provide name and email and password" });
      return;
    };
  
    if (password.length < 7) {
      res.status(400).json({
        message:
          "Please make your password at least 8 characters long for security purposes.",
      });
      return;
    };
  
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "Email check went bad." });
        return;
      };
      if (foundUser) {
        res.status(400).json({ message: "Email taken. Choose another one." });
        return;
      };
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const aNewUser = new User({
        name: name,
        email: email,
        password: hashPass,
      });
  
      aNewUser.save((err) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
          return;
        };
  
        req.login(aNewUser, (err) => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          };

          res.status(200).json(aNewUser);
        });
      });
    });
};

const logout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin =  expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ['RS256']});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

module.exports = {signup , logout , requireSignin, hasAuthorization}