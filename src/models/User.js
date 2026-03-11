const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    cellphone: String,
    password_hash: String,
    profile_type: {
        type: String,
        enum: ['patient', 'secretary']
    }
}, { timestamps: true });