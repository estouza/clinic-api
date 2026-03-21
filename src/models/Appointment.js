const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: Date,
  time: String,
  cep: String,
  address: String,
  weather: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);