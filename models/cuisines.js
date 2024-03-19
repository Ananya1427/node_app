const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        required: true
    },
    products: [
        {
            title: {
                type: String,
                trim: true,
                required: true,
                maxlength: 32,
                text: true,
            },
            slug: {
                type: String,
                unique: true,
                lowercase: true,
                index: true,
            },
            description: {
                type: String,
                required: true,
                maxlength: 2000,
                text: true,
            },
            price: {
                type: Number,
                required: true,
                trim: true,
                maxlength: 32,
            },
            category: {
                type: String,
            },
            quantity: Number,
            sold: {
                type: Number,
                default: 0,
            },
            images: {
                type: Array,
            },
        }
    ],
})

module.exports = mongoose.model('Cuisine', cuisineSchema);
