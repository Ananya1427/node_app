const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
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
                assignedTo: String,
                orderFrom: {
                    name: String,
                    email: String
                }
            },
        ],
        shipping: Number,
        cartQuantity: Number,
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderdBy: {
            name: String,
            email: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
