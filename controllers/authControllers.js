const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Resgister a new user
//@route POST /api/users/register
//@access only admin
const registerUser = asyncHandler(async (req, res) => {
  const { companyName, email, password } = req.body;
  if (!companyName || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Same Email exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      companyName: user.companyName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({
      id: user._id,
      companyName: user.companyName,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get current user details
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc Get all clients details
//@route GET /api/users/allClients
//@access private
const allClients = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } }, "-password");
  res.json(users);
});

module.exports = { registerUser, loginUser, currentUser, allClients };
