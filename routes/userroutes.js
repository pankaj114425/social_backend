const express=require('express');
const userSignUpController = require('../controllers/register');
const userSignInController = require('../controllers/login');
const userRouter= express.Router();


userRouter.post('/register',userSignUpController)
userRouter.post('/login',userSignInController)

module.exports = userRouter;