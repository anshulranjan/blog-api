const express = require('express');
const { signup , signin , signout , forgotPassword , resetPassword } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//const validator = require('../validator/index');
const { validationResult, check } = require('express-validator');
const router = express.Router();
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", 
check('newPassword').notEmpty().withMessage('Password should not be empty'),
check('newPassword').isLength({min: 6}).withMessage('Password should contains atleast 6 charcaters'),
check('newPassword').matches(/\d/).withMessage('Password must conatins a number'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
},
resetPassword);


router.post('/signup',
check('name').notEmpty().withMessage('Name should not be empty'),
check('email').notEmpty().withMessage('Email should not be empty'),
check('email').matches(/.+\@.+\..+/).withMessage('Email Format is not correct'),
check('email').isLength({min: 4}).withMessage('Email is too short'),
check('password').notEmpty().withMessage('Password should not be empty'),
check('password').isLength({min: 6}).withMessage('Password should contains atleast 6 charcaters'),
check('password').matches(/\d/).withMessage('Password must conatins a number'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
},
signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.param("userId", userById);
module.exports = router;