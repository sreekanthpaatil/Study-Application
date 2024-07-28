import express from 'express';
import { auth } from '../middleware/auth.js';
import { createSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.post('/create', [auth], createSchedule);

export default router;