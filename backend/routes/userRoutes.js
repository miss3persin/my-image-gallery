const express = require("express");
const router = express.Router();
const {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");

router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);


module.exports = router;