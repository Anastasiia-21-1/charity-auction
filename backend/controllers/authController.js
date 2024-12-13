require('dotenv').config()
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '180000s' });
}

exports.register = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
      },
      select: {
        id: true,
        email: true
      }
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
        id: true,
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
