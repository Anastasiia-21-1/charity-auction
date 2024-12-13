const prisma = require('../lib/prisma');

exports.getAllAuctions = async (req, res, next) => {
    try {
        const auctions = await prisma.auction.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                startingPrice: true,
                currency: true,
                seller: true,
                charity: true,
                createdAt: true,
                endsAt: true,
                images: true,
                bids: true
            }
        });
        res.json(auctions);
    } catch (error) {
        next(error);
    }
};

exports.createAuction = async (req, res, next) => {
    try {
        const {title, description, startingPrice, currency, charityId, images, endsAt} = req.body;
        const auction = await prisma.auction.create({
            data: {
                title,
                description,
                startingPrice,
                currency,
                charityId,
                endsAt: new Date(endsAt),
                sellerId: req.user.id,

                ...(images?.length && {
                    images: {
                        create: images.map((url) => ({url}))
                    }
                })
            }
        });
        res.status(201).json(auction);
    } catch (error) {
        next(error);
    }
};

exports.getAuctionById = async (req, res, next) => {
    try {
        const auction = await prisma.auction.findUnique({
            where: {id: req.params.id},
            include: {images: true, bids: true}
        });
        if (!auction) {
            return res.status(404).json({error: 'Auction not found'});
        }
        res.json(auction);
    } catch (error) {
        next(error);
    }
};
