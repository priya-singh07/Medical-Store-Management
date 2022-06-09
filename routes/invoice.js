const router = require('express').Router()
const { ADDINVOICE, GETALLINVOICES, EDITINVOICE } = require('../api/invoice');

router.post('/add', ADDINVOICE);
router.post('/edit', EDITINVOICE);
router.get('/all', GETALLINVOICES);

module.exports = router;