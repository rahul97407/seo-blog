const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin, preSignup, forgotPassword, resetPassword, googleLogin} = require('../controllers/auth');


const {runValidation} = require('../validators/index');
const {userSignupValidator , userSignInValidator , forgotPasswordValidator , resetPasswordValidator} = require('../validators/auth');


router.post('/pre-signup' , userSignupValidator , runValidation , preSignup);
router.post('/signup' ,  signup);
router.post('/signin' , userSignInValidator , runValidation , signin);
router.get('/signout' , signout);

router.put('/forgot-password' , forgotPasswordValidator , runValidation , forgotPassword)
router.put('/reset-password' , resetPasswordValidator , runValidation , resetPassword)


router.post('/google-login' , googleLogin)
module.exports = router;