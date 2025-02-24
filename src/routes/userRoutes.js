const express = require('express');
const router = express.Router();
const {verifyToken, isAdmin, isUser} = require('../middleware/authmiddleware')
const {getAllUsers, getUser} = require('../controller/userController')

router.get("/", verifyToken, isAdmin, getAllUsers);
router.get("/:id", verifyToken, getUser);
module.exports = router;
