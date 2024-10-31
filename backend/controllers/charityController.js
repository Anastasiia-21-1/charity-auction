const prisma = require('../lib/prisma');

exports.getAllCharities = async (req, res, next) => {
    try {
        const charities = await prisma.charity.findMany();
        res.json(charities);
    } catch (error) {
        next(error);
    }
};

exports.createCharity = async (req, res, next) => {
    try {
        const { name, description, website } = req.body;
        const charity = await prisma.charity.create({
            data: { name, description, website }
        });
        res.status(201).json(charity);
    } catch (error) {
        next(error);
    }
};

exports.getCharityById = async (req, res, next) => {
    try {
        const charity = await prisma.charity.findUnique({
            where: { id: req.params.id }
        });
        if (!charity) {
            return res.status(404).json({ error: 'Charity not found' });
        }
        res.json(charity);
    } catch (error) {
        next(error);
    }
};
