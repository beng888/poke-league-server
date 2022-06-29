const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const protect = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies[process.env.ACCESS_TOKEN_NAME];
  console.log('%c⧭', 'color: #5200cc', 'accessToken -------------->', accessToken);

  if (!accessToken) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      req.authenticated = true;
      req.user = await User.findOne({ where: { id: decoded.id } });

      return next();
    }
    throw new Error('unauthorized');
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

module.exports = { protect };
