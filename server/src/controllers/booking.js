import Booking from '../models/booking.js';
import User from '../models/user.js';

export const bookSlot = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthenticated.' });

        const { teacherId, slot, subject } = req.body;

        const booking = new Booking({
            student: req.user,
            teacher: teacherId,
            slot,
            subject
        });

        await booking.save();

        // Add the booking ID to the user's bookings array
        await User.findByIdAndUpdate(
            req.user,
            { $push: { bookings: booking._id } },
            { new: true }
        );

        return res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

export const deleteExpiredBookings = async (req, res) => {
    try {
        const currentTime = new Date();

        // Find bookings where the 'to' time is before the current time
        const expiredBookings = await Booking.find({
            'slot.to': { $lt: currentTime.toISOString() }
        });

        // Delete the expired bookings
        await Booking.deleteMany({
            'slot.to': { $lt: currentTime.toISOString() }
        });

        return res.status(200).json({ message: 'Expired bookings deleted successfully', deletedBookings: expiredBookings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};