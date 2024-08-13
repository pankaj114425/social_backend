const express=require('express');
const createPost = require('../controllers/createPost');
const authToken = require('../middleware/authToken');
const allposts = require('../controllers/allposts');
const getPostById = require('../controllers/getPostById');
const updatePost = require('../controllers/updatePost');
const deletePost = require('../controllers/deletePost');
const postRouter= express.Router();

postRouter.post('/',authToken,createPost)
postRouter.get('/allposts',allposts)
postRouter.get('/:id',getPostById)
 postRouter.patch('/:id',authToken,updatePost)
postRouter.delete('/:id',authToken,deletePost)
module.exports = postRouter;