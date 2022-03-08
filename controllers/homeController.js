const mongoose = require('mongoose');
const Post = require('../models/post');
const user = require('../models/user');

const index = async (req, res) => {
  
  res.render('../views/index');
};

module.exports = { 
    index
}