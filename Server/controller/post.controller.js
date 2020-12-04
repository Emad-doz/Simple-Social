const Post = require('../models/post.model');

const create = (req, res)=>{
    let post = new Post(fields)
    post.postedBy= req.profile
    try {
      let result =  post.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({message : "error while create new post"}
    )}
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try{
      let posts = await Post.find({postedBy: { $in : req.profile.following } })
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .sort('-created')
                            .exec()
      res.json(posts)
    }catch(err){
      return res.status(400).json({message : "error while get the news feed"}
    )}
}

const like = async (req, res) => {
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
      res.json(result)
    }catch(err){
        return res.status(400).json({message : "error while like"}
    )}
}
  
const unlike = async (req, res) => {
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
      res.json(result)
    }catch(err){
      return res.status(400).json({message : "error while unlike"}
    )}
}

const comment = async (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
                             .populate('comments.postedBy', '_id name')
                             .populate('postedBy', '_id name')
                             .exec()
      res.json(result)
    }catch(err){
      return res.status(400).json({message : "error while uncomment"}
    )}
}
const uncomment = async (req, res) => {
    let comment = req.body.comment
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
                             .populate('comments.postedBy', '_id name')
                             .populate('postedBy', '_id name')
                             .exec()
      res.json(result)
    }catch(err){
      return res.status(400).json({message : "error while uncomment"}
      )}
}

const isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if(!isPoster){
      return res.status('403').json({message: "User is not authorized"}
    )}
    next()
}

const postByID = async (req, res, next, id) => {
    try{
      let post = await Post.findById(id).populate('postedBy', '_id name').exec()
      if (!post)
        return res.status('400').json({
          error: "Post not found"
        })
      req.post = post
      next()
    }catch(err){
      return res.status('400').json({message: "Could not retrieve use post"}
    )}
  }

const remove = async (req, res) => {
    let post = req.post
    try{
      let deletedPost = await post.remove()
      res.json(deletedPost)
    }catch(err){
      return res.status(400).json({message: "error while delete the post"}
    )}
  }

module.exports = {
    create ,photo, listNewsFeed, 
    like, unlike, comment , uncomment,
    postByID, isPoster, remove
}