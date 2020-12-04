const passport   = require('passport');
const bcrypt     = require('bcrypt');
const User       = require('../models/user.model');

const signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      res.status(400).json({ message: "Provide username and email and password" });
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

const login = (req, res, next) => {
    passport.authenticate("local", (err, theUser, failureDetails) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Something went wrong authenticating user" });
          return;
        };
    
        if (!theUser) {
          res.status(401).json(failureDetails);
          return;
        };
 
        req.login(theUser, (err) => {
          if (err) {
            res.status(500).json({ message: "Session save went bad." });
            return;
          };
          res.status(200).json(theUser);
        });
      })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: "Log out success!" });
};

const loggedin = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    };
    res.status(403).json({ message: "Unauthorized" });
};

module.exports = {signup , login , logout , loggedin}

/*const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email}
    })
  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}*/