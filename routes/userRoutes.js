const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  allClients,
} = require("../controllers/authControllers");
const validateToken = require("../middlewares/validateTokenHandler");
const checkAdmin = require("../middlewares/checkAdminHandler");

const router = express.Router();

router.post("/register", checkAdmin, registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.get("/allclients", checkAdmin, validateToken, allClients);

module.exports = router;
