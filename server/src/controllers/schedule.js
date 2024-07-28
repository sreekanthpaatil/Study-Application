import Schedule from '../models/schedule.js';
import { scheduleGenerator } from '../utils/scheduleGenerator.js';

export const createSchedule = async (req, res) => {
    try {
      const {t_days, hoursPerDay, sessionLength} = req.body;
      if (!req.user) return res.status(401).json({ message: 'Unauthenticated.' });

      const schedule = scheduleGenerator(t_days, hoursPerDay, sessionLength);
  
      // Return a success message or the created post
      return res.status(201).json(schedule);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };