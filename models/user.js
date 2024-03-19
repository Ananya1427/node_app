const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        dob: String,
        gender: String,
        email: {
            type: String,
            index: true,
            required: true
        },
        contact: String,
        address: String,
        state: String,
        city: String,
        zipCode: String,
        role: {
            type: String,
            default: 'user',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
