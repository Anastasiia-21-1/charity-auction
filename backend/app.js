const express = require('express');
const bodyParser = require('body-parser');
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');
const charityRoutes = require('./routes/charityRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use('/auctions', auctionRoutes);
app.use('/bids', bidRoutes);
app.use('/charities', charityRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

module.exports = app;
