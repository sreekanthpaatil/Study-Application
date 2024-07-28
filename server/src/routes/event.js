import express from 'express';
import { auth } from '../middleware/auth.js';
import { getEvents } from '../controllers/event.js';

const router = express.Router();

router.get('/getEvents', [auth], getEvents);

export default router;