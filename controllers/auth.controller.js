const asyncHandler = require('express-async-handler');
const { User } = require('../models');
const argon2 = require('argon2');
const { sign, verify } = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error(`Passwords don't match`);
  }

  const userExists = await User.findOne({ where: { username: username } });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hash = await argon2.hash(password);
  const user = await User.create({ username, password: hash });

  if (user) {
    sendToken(user, 201, res);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const user = await User.findOne({ where: { username: username } });

  if (user && (await argon2.verify(user.password, password))) {
    sendToken(user, 200, res);
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const logoutUser = async (req, res) => {
  res.clearCookie(process.env.ACCESS_TOKEN_NAME, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.send('Successfully logged out!');
};

const revalidateUser = async (req, res) => {
  sendToken(req.user, 200, res);
};

const sendToken = (user, statusCode, res) => {
  const token = sign({ username: user.username, id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });

  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
  };

  res.cookie(process.env.ACCESS_TOKEN_NAME, token, options);

  user.password = null;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

module.exports = { registerUser, loginUser, logoutUser, revalidateUser };
