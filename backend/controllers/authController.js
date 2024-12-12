require('dotenv').config()
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generateAccessToken(user) {
  return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.register = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      },
    });
    const token = generateAccessToken(user);
    res.json({ token, message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      select: {
        email: true,
        password: true,
      },
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateAccessToken(user);
    res.json({ token, message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
};
