const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },

    date: Date,
    
    time: String,
    
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        required: true
    }    

}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);