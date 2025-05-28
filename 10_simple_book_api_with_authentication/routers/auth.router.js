const express = require("express");
const { signIn, signUp, getUsers } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/jwt-token.middleware");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/users", authenticateToken, getUsers);

module.exports = router;