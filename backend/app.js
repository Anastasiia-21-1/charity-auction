const express = require('express');
const bodyParser = require('body-parser');
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');
const charityRoutes = require('./routes/charityRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const donatesRoutes = require('./routes/donatesRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.set("io", io);

const cors = require('cors')

app.use(cors({
    origin: "*",
}))

app.use(bodyParser.json());

app.use('/auctions', auctionRoutes);
app.use('/bids', bidRoutes);
app.use('/charities', charityRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/donates', donatesRoutes)

app.use(errorHandler);

module.exports = server;
