const User = require('../models/user.model');
const mongoose = require("mongoose");
const profilePic = ('../public/images/profile-pic.png')


const list = async (req, res) => {
    try {
      let users = await User.find().select('name email')
      res.json(users)
    } catch (err) {
      return res.status(400).json({ message: "getting users list went wrong."
      })
    }
  }

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
    try {
      let user = await User.findById(id).populate('following', '_id name')
      .populate('followers', '_id name')
      .exec()
      if (!user)
        return res.status('400').json({
          error: "User not found"
        })
      req.profile = user
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve user"
      })
    }
  }

const read = (req, res) => {
    return res.json(req.profile)
}

const update = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }

    User.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `User with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

const remove = (req,res) => {
    const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: `User with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

//!-- need to work more in this part //
const findPeople = async (req, res) => {
    let following = req.following
    //following.push(req._id)
    try {
      let users = await User.find({ _id: { $nin : following } }).select('name')
      res.json(users)
    }catch(err){
      return res.status(400).json({message: "Error while finding people" })
    }
}

const addFollowing = async (req, res, next) => {
    try{
      await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}) 
      next()
    }catch(err){
      return res.status(400).json({message: "Error while remove following"})
    }
}

const addFollower = async (req, res) => {
    try{
      let result = await User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
                             .populate('following', '_id name')
                             .populate('followers', '_id name')
                             .exec()
        res.json(result)
      }catch(err) {
        return res.status(400).json({message: "Error while add follower"})
      }  
}

const removeFollowing = async (req, res, next) => {
    try{
      await User.findByIdAndUpdate(req.body.userId, {$pull: {following: req.body.unfollowId}}) 
      next()
    }catch(err) {
      return res.status(400).json({message: "Error while remove following" })
    }
}

const removeFollower = async (req, res) => {
    try{
      let result = await User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
                             .populate('following', '_id name')
                             .populate('followers', '_id name')
                             .exec() 
      res.json(result)
    }catch(err){
        return res.status(400).json({message: "Error while remove follower"})
    }
}

const photo = (req, res, next) => {
    if(req.profile.photo.data){
      res.set("Content-Type", req.profile.photo.contentType)
      return res.send(req.profile.photo.data)
    }
    next()
  }

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd()+ profilePic)
}

module.exports = {
    list, read, update, remove, userByID,findPeople, 
    addFollowing, addFollower,removeFollowing, 
    removeFollower, defaultPhoto, photo
 }