const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/checkAuth");
const { signIn, signUp, updateUser,getUser } = require("../controller/user");

//Handling all the incoming requests
router.post("/signup", signUp);
router.get("/signup", getUser);
router.post("/login", signIn);
router.get("/",getUser);
router.patch("/:userID", updateUser);
module.exports = router;

