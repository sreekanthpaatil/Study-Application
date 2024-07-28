import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            references: "userSchema",
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            references: "userSchema",
        },
        slot: {
            from: String,
            to: String
        },
        subject: String,
    }
);

export default mongoose.model('Booking', bookingSchema);