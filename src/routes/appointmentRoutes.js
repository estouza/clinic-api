const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, appointmentController.createAppointment);

router.get('/', authMiddleware, appointmentController.list);

module.exports = router;