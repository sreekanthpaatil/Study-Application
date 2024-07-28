import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        teachers: {
            type: [mongoose.Schema.Types.ObjectId],
            references: "userSchema",
        },
        students: {
            type: [mongoose.Schema.Types.ObjectId],
            references: "userSchema",
        }
    }
);

export default mongoose.model('Subject', subjectSchema);