const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        restaurantName: String,
        address: String,
        state: String,
        city: String,
        zipCode: String,
        restaurantContact: String,
        ownerContact: String,
        firstName: String,
        lastName: String,
        email: {
            type: String,
            index: true,
            required: true
        },
        establishmentType: String,
        outletType: Array,
        cuisineType: Array,
        weekDays: Array,
        opensAt: String,
        closesAt: String,
        menuImages: Array,
        restaurantImages: Array,
        foodImages: Array,
        status: {
            type: String,
            default: 'requested'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
