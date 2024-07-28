import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
    {
        schedule: [{
            day: Number,
            sessions: [{
                type: String,
                time: String
            }]
        }],
    }
);

export default mongoose.model('Schedule', scheduleSchema);