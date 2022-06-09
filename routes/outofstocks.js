const router = require('express').Router();
const { ADDSTOCKS, GETALLSTOCKS, GETONESTOCKS, EDITSTOCKS, DELETESTOCKS } = require('../api/outofstocks');

router.post('/add', ADDSTOCKS);
router.get('/all', GETALLSTOCKS);
router.get('/:id', GETONESTOCKS);
router.post('/:id', EDITSTOCKS);
router.delete('/:id', DELETESTOCKS);

module.exports = router;