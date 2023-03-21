const { randomUser, getAllUsers, postAUser, updateAUser, deleteAUser, bulkUpdate } = require('../controller/user.controller');

const router = require('express').Router();

router.get('/random',randomUser);
router.get('/all',getAllUsers);
router.post('/save',postAUser);
router.patch('/update/:_id',updateAUser);
router.delete('/delete/:_id',deleteAUser);
router.patch('/bulk-update',bulkUpdate);


module.exports = router;