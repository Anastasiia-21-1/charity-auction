const prisma = require('../lib/prisma');

exports.getAllDonates = async (req, res, next) => {
    try {
        const donates = await prisma.donation.findMany({
            select: {
                id: true,
                amount: true,
                createdAt: true,
                userId: true,
                charity: {
                    select: {
                        name: true,
                        description: true,
                    }
                }
            }
        });
        res.json(donates);
    } catch (error) {
        next(error);
    }
};

exports.createDonate = async (req, res, next) => {
    try {
        const {charityId, amount} = req.body;
        const donate = await prisma.donation.create({
            data: {charityId, amount, userId: req.user.id}
        });
        res.status(201).json(donate);
    } catch (error) {
        next(error);
    }
};

exports.getDonateById = async (req, res, next) => {
    try {
        const donate = await prisma.donation.findUnique({
            where: {id: req.params.id}
        });
        if (!donate) {
            return res.status(404).json({error: 'Donate not found'});
        }
        res.json(donate);
    } catch (error) {
        next(error);
    }
};
