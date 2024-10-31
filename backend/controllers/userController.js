const prisma = require('../lib/prisma');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await prisma.user.create({
            data: { name, email }
        });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};
