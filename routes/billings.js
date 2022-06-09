const router = require('express').Router();
const { GETBILLFROMINVOICE, ADDBILL, EDITBILL, DELETEBILL, GETPRICEBYID, GETDETAILSBYNAME, GETALLBILLS } = require('../api/billings');

router.get('/:id', GETBILLFROMINVOICE);
router.get('/all', GETALLBILLS);
router.post('/add', ADDBILL);
router.post('/edit', EDITBILL);
router.delete('/delete/:id', DELETEBILL);
router.get('/getpricebyid/:id', GETPRICEBYID);
router.get('/getdetailsbyname/:name', GETDETAILSBYNAME);

module.exports = router;