const prisma = require('../lib/prisma');

exports.makeBid = async (req, res, next) => {
    try {
        const io = req.app.get("io");
        const { amount, auctionId } = req.body;
        const bids = await prisma.bid.create({
            data: {
                amount,
                userId: req.user.id,
                auctionId,
            }
        });
        io.emit(`auction-bids:${auctionId}`, bids);
        res.json(bids);
    } catch (error) {
        next(error);
    }
}

exports.getAllBids = async (req, res, next) => {
    try {
        const bids = await prisma.bid.findMany({
            include: { auction: true, user: true }
        });
        res.json(bids);
    } catch (error) {
        next(error);
    }
};

exports.createBid = async (req, res, next) => {
    try {
        const { amount, userId, auctionId } = req.body;
        const bid = await prisma.bid.create({
            data: {
                amount,
                userId,
                auctionId,
            }
        });
        res.status(201).json(bid);
    } catch (error) {
        next(error);
    }
};

exports.getBidById = async (req, res, next) => {
    try {
        const bid = await prisma.bid.findUnique({
            where: { id: req.params.id },
            include: { auction: true, user: true }
        });
        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }
        res.json(bid);
    } catch (error) {
        next(error);
    }
};
