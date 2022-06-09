require('dotenv/config');
require('./db_config/config');
const express = require('express');
const app = express();
const cors = require('cors');
const stockRoutes = require('./routes/stocks');
const invoice = require('./routes/invoice');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 2000;

app.use('/stocks',stockRoutes);
app.use('/invoices', invoice);
app.use('/outofstocks', require('./routes/outofstocks'));
app.use('/billing', require('./routes/billings'));

app.listen(PORT, () => {
    console.log(`server is running on port @${PORT}`);
})