const express = require("express");
const router = express.Router();
const SignUp = require("../controllers/signup");
const Profile = require("../controllers/profile");

/* Routes */
router.post("/signup", SignUp);
router.get("/profile/:username", Profile);

module.exports = router;
