const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    time: String,
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled']
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);