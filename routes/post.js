const express = require('express');
const postControllers = require('../controllers/post');
const { requireSingin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//const validator = require('../validator/index');
const Post = require('../models/post');
const { validationResult, check } = require('express-validator');
const router = express.Router();

router.get('/posts', postControllers.getPosts);

//comments
router.put("/post/comment",requireSingin, postControllers.comment);
router.put("/post/uncomment",requireSingin, postControllers.uncomment);

router.get('/posts/by/:userId', requireSingin, postControllers.postsByUser);
router.post('/post/new/:userId', requireSingin , postControllers.createPost,
  check('title').notEmpty().withMessage('Title should not be empty'),
  check('body').notEmpty().withMessage('Body should not be empty'),
  check('title').isLength({ min: 4 , max:150}).withMessage('Title should be between 4 to 150 characters'),
  check('body').isLength({ min: 4 , max:20000}).withMessage('Body should be between 4 to 20000 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    next();
  });
router.get('/post/:postId', postControllers.singlePost);

router.delete('/post/:postId', requireSingin, postControllers.isPoster, postControllers.deletePost);
//photo
router.get("/post/photo/:postId", postControllers.getPhoto);

router.put('/post/:postId', requireSingin, postControllers.isPoster, postControllers.updatePost);



router.param("userId", userById);
router.param("postId", postControllers.postById);
module.exports = router;