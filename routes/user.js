const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser, userPhoto } = require('../controllers/user');
const { requireSingin } = require('../controllers/auth');

//const validator = require('../validator/index');
const router = express.Router();
router.get("/users", allUsers);
router.get("/user/:userId", requireSingin, getUser);
router.put("/user/:userId", requireSingin, updateUser);
router.delete("/user/:userId", requireSingin, deleteUser);
router.get("/user/photo/:userId", userPhoto);
router.param("userId", userById);

module.exports = router;