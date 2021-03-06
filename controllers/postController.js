const mongoose = require('mongoose');
const Post = require('../models/post');
const user = require('../models/user');

const getAll = async (req, res) => {
  
  const posts = await Post.find();
     
  res.send({
    error: false,
    message: `All posts from the database`,
    posts: posts
  });
};

const getById = async (req, res) => {

    const posts = await Post.findById(req.params.id);

    res.send({
      error: false,
      message: `Post with id #${posts._id}, has been fetched`,
      posts: posts,
    });
};

const postCreate = async (req, res) => {

  const post = new Post();
  post.user = req.body.user;
  post.content = req.body.content;
  post.title = req.body.title;
  post.save().then((result) => {
    user.findOne({_id: post.user}, (err, user) => {
      if(user){
        user.posts.push(post);
        user.save();
      }
    });
  });

  res.send({
    error: false,
    message: 'New post has been created',
    post: post
  });
};

const postUpdate = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  const post = await Post.findById(req.params.id);
                                                      
  res.send({
    error: false,
    message: `Post with id #${post._id} has been updated`,
    post: post
  });
};

const getDeleted = async (req, res) => {

  await Post.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `Post with id #${req.params.id} has been deleted`
  });
};

module.exports = { 
    getAll,
    getById, 
    postCreate, 
    postUpdate, 
    getDeleted
}