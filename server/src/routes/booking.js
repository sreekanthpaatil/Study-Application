import express from 'express';
import { auth } from '../middleware/auth.js';
import { bookSlot, deleteExpiredBookings } from '../controllers/booking.js';

const router = express.Router();

router.post('/create', [auth], bookSlot);
router.delete('/delete', deleteExpiredBookings);

export default router;