const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        items: [
            {
                cuisines: [
                    {
                        cuisineId: {
                            type: ObjectId,
                            ref: 'Cuisine',
                        },
                        title: String,
                        description: String,
                        price: Number,
                        count: Number,
                        quantity: Number,
                        images: Array,
                    }
                ],
                orderFrom: {
                    name: String,
                    email: String
                },
                assignedTo: {
                    name: String,
                    email: String
                },
                orderStatus: {
                    driver: {
                        type: String,
                        default: 'Order Placed',
                        enum: [
                            'Order Placed',
                            'Order Confirmed',
                            'Order Dispatched',
                            'Order Declined',
                            'Order Delivered',
                        ],
                    },
                    restaurant: {
                        type: String,
                        default: 'Order Placed',
                        enum: [
                            'Order Placed',
                            'Order Confirmed',
                            'Order Dispatched',
                            'Order Declined',
                            'Order Delivered',
                        ],
                    },
                },
            },
        ],
        paymentIntent: {},
        shipping: Number,
        orderTotal: Number,
        totalAfterDiscount: Number,
        orderdBy: {
            name: String,
            email: String
        },
        address: String,
        deliveryInstructions: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
