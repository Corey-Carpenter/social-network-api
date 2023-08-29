const router = require('express').Router();
const courseRoutes = require('./userRoutes');
const studentRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
