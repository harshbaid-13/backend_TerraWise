const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      const { email } = decoded;
      const user = await User.findOne({ email });
      decoded.dataId = user.dataId;
      req.user = decoded;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Token not found");
  }
});

module.exports = validateToken;
