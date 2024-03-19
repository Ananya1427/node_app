const user = require('../models/user');
const restaurant = require('../models/restaurant');
const cuisine = require('../models/cuisines');
const cart = require('../models/cart');
const order = require('../models/order');

exports.createOrUpdateUser = async (req, res) => {
    try {
        const { email } = req.user;
        const { firstName, lastName, dob, gender, contact, address, state, city, zipCode, role } = req.body.userDetails;
        let existingUser = await user.findOneAndUpdate({ email }, { firstName, lastName, dob, gender, contact, address, state, city, zipCode, role }, { new: true });
        if (existingUser) {
            res.status(200).json({ user: existingUser, message: 'Existing User Updated Successfully!' });
        } else {
            let newUser = await new user({ firstName, lastName, dob, gender, email, contact, address, state, city, zipCode, role }).save();
            if (newUser) {
                res.status(200).json({ user: newUser, message: 'New User Registered Successfully!' });
            }
            else {
                res.status(202).json({ message: 'Failed To Register/Update User!' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.checkUserRole = async (req, res) => {
    try {
        const { email, role } = req.body;
        if (role === 'partner') {
            let existingRestaurant = await restaurant.findOne({ email });
            if (existingRestaurant) {
                res.status(200).json({ role: 'partner', message: 'Email registered with a restaurant', pathname: '/partner-login' });
            } else {
                res.status(202).json({ message: 'No restaurant registered with this email', pathname: '/create-partner-account' })
            }
        } else {
            let existingUser = await user.findOne({ email });
            if (existingUser && role.includes(existingUser.role)) {
                res.status(200).json({ role: existingUser.role, message: 'Valid User', pathname: `${role.includes('driver') ? '/driver-login' : '/login'}` });
            }
            else {
                res.status(202).json({ message: `No ${role.split('-')[0]} account exits with this email`, pathname: `${role.includes('driver') ? '/create-driver-account' : '/create-account'}` });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getCurrentUser = async (req, res) => {
    try {
        const { email } = req.user;
        let existingUser = await user.findOne({ email });
        if (existingUser) {
            res.status(200).json({ user: existingUser, messgae: 'Current User Details' });
        }
        else {
            res.status(202).json({ message: 'No User Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getUsers = async (req, res) => {
    try {
        let users = await user.find({});
        if (users) {
            res.status(200).json({ users, message: 'Registered Users Details' });
        } else {
            res.status(202).json({ message: 'No User Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getUsersByRole = async (req, res) => {
    try {
        const { role } = req.body;
        let users = await user.find({ role });
        if (users) {
            res.status(200).json({ users, message: 'Registered Users Details' });
        } else {
            res.status(202).json({ message: 'No User Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.registerRestaurant = async (req, res) => {
    try {
        const { email } = req.user;
        const {
            restaurantName,
            address,
            state,
            city,
            zipCode,
            restaurantContact,
            ownerContact,
            firstName,
            lastName,
            establishmentType,
            outletType,
            cuisineType,
            weekDays,
            opensAt,
            closesAt,
            menuImages,
            restaurantImages,
            foodImages
        } = req.body.obj;

        let existingRestaurant = await restaurant.findOneAndUpdate({ email }, { restaurantName, address, state, city, zipCode, restaurantContact, ownerContact, firstName, lastName, establishmentType, outletType, cuisineType, weekDays, opensAt, closesAt, menuImages, restaurantImages, foodImages }, { new: true });
        if (existingRestaurant) {
            res.status(200).json({ restaurant: existingRestaurant, message: 'Existing Restaurant Updated Successfully!' });
        } else {
            let newRestaurant = await new restaurant({ restaurantName, address, state, city, zipCode, restaurantContact, ownerContact, firstName, lastName, email, establishmentType, outletType, cuisineType, weekDays, opensAt, closesAt, menuImages, restaurantImages, foodImages }).save();
            if (newRestaurant) {
                res.status(200).json({ restaurant: newRestaurant, message: 'New Restaurant Created Successfully!' });
            } else {
                res.status(400).json({ message: 'Failed to create new restaurant' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getCurrentRestaurant = async (req, res) => {
    try {
        const { email } = req.body;
        let existingRestaurant = await restaurant.findOne({ email });
        if (existingRestaurant) {
            res.status(200).json({ restaurant: existingRestaurant, message: 'Current Restaurant Details' });
        }
        else {
            res.status(202).json({ message: 'No Restaurant Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getRestaurants = async (req, res) => {
    try {
        let restaurants = await restaurant.find({});
        if (restaurants) {
            res.status(200).json({ restaurants, message: 'Registered Restaurants Details' });
        } else {
            res.status(202).json({ message: 'No Restaurant Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getRestaurant = async (req, res) => {
    try {
        const { restaurantName } = req.body;
        let existingRestaurant = await restaurant.findOne({ restaurantName });
        let cuisines = await cuisine.findOne({ email: existingRestaurant.email })
        if (restaurant) {
            res.status(200).json({ restaurant: existingRestaurant, cuisines, message: 'Restaurant Cuisine Details Fetched Successfully!' });
        } else {
            res.status(202).json({ message: 'No Cuisines Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getRestaurantsByZip = async (req, res) => {
    try {
        const { zipCode } = req.body;
        let restaurants = await restaurant.find({ zipCode, status: 'approved' });
        if (restaurants) {
            res.status(200).json({ restaurants, message: 'Restaurants Details Fetched Successfully!' });
        } else {
            res.status(202).json({ message: 'No Restaurant Found at the Entered Zip Code' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.modifyRestaurantStatus = async (req, res) => {
    try {
        const { email, status } = req.body;
        let existingRestaurant = await restaurant.findOneAndUpdate({ email }, { status });
        let restaurants = await restaurant.find({});
        if (existingRestaurant) {
            res.status(200).json({ restaurants, message: 'Restaurant Status Updated Scuccessfully!' });
        } else {
            res.status(202).json({ message: 'Failed to update restaurant status' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createOrUpdateCuisine = async (req, res) => {
    try {
        const { email, title, description, price, category, quantity, images, id } = req.body.cuisineDetails;
        let existingCreatedUser = await cuisine.findOne({ email });
        // newOrExistingProduct(req.body.productDetails);
        if (existingCreatedUser) {
            let existingProduct = existingCreatedUser.products.find(product => product.title == title);
            if (existingProduct) {
                let updatedProduct = await cuisine.updateOne({ email, 'products.title': title }, { $set: { 'products.$.title': title, 'products.$.slug': title.toLowerCase(), 'products.$.description': description, 'products.$.price': price, 'products.$.category': category, 'products.$.quantity': quantity, 'products.$.images': images } });
                if (updatedProduct) {
                    let userProd = await cuisine.findOne({ email });
                    let products = userProd && userProd.products;
                    res.status(200).json({ products, message: 'Existing Cuisine Updated Successfully!' });
                } else {
                    res.status(202).json({ message: 'Failed To Update Cuisine!' });
                }
            } else {
                let addProduct = await cuisine.updateOne({ email }, { $push: { products: { title, slug: title.toLowerCase(), description, price, category, quantity, images } } }, { new: true });
                if (addProduct) {
                    let userProd = await cuisine.findOne({ email });
                    let products = userProd && userProd.products;
                    res.status(200).json({ products, message: 'New Cuisine Created Successfully!' });
                } else {
                    res.status(202).json({ message: 'Failed To Create a Cuisine!' });
                }
            }
        } else {
            let newProduct = await new cuisine({ products: { title, slug: title.toLowerCase(), description, price, category, quantity, images }, email }).save();
            if (newProduct) {
                let products = newProduct && newProduct.products;
                res.status(200).json({ products, message: 'New Cuisine Created Successfully!' });
            }
            else {
                res.status(202).json({ message: 'Failed To Register/Update Cuisine!' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

// exports.getProducts = async (req, res) => {
//     try {
//         let products = await product.find({});
//         if (products) {
//             res.status(200).json({ products, message: 'Registered Products Details' });
//         } else {
//             res.status(202).json({ message: 'No Products Found' });
//         }
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

exports.getUserCuisines = async (req, res) => {
    try {
        const { email } = req.body;
        let userProd = await cuisine.findOne({ email });
        if (userProd && userProd.products.length) {
            res.status(200).json({ products: userProd.products, message: 'Registered Cuisines Details' });
        } else {
            res.status(202).json({ message: 'No Cuisine Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getCuisine = async (req, res) => {
    try {
        const { title, email } = req.body;
        let userProd = await cuisine.findOne({ email });
        let productObj = userProd && userProd.products.find(prod => prod.slug === title);
        if (productObj) {
            res.status(200).json({ product: productObj, message: 'Cuisine Details' });
        } else {
            res.status(202).json({ message: 'No Cuisine Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.deleteCuisine = async (req, res) => {
    try {
        const { title, email } = req.body;
        let userProd = await cuisine.findOne({ email });
        let updatedProducts = userProd && userProd.products.filter(prod => prod.title !== title);
        let latestProducts = await cuisine.findOneAndUpdate({ email }, { products: updatedProducts }, { new: true });
        if (latestProducts) {
            // await product.findOneAndDelete({ createdBy: email, title });
            let products = latestProducts && latestProducts.products;
            res.status(200).json({ products, message: 'Cuisine Deleted Successfully!' });
        } else {
            res.status(202).json({ message: 'Failed to Delete Cuisine!' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createOrUpdateCart = async (req, res) => {
    try {
        const { items, shipping, cartTotal, cartQuantity, totalAfterDiscount, orderdBy } = req.body.cart;
        let existingCart = await cart.findOneAndUpdate({ 'orderdBy.email': orderdBy.email }, { items, shipping, cartTotal, cartQuantity, totalAfterDiscount, orderdBy }, { new: true });
        if (existingCart) {
            let latestCart = await cart.findOne({ 'orderdBy.email': orderdBy.email });
            res.status(200).json({ cart: latestCart, message: 'Cart Updated Successfully!' });
        } else {
            let newCart = await new cart({ items, shipping, cartTotal, cartQuantity, totalAfterDiscount, orderdBy }).save();
            if (newCart) {
                let latestCart = await cart.findOne({ 'orderdBy.email': orderdBy.email });
                res.status(200).json({ cart: latestCart, message: 'Cart Update Successfuly!' });
            } else {
                res.status(202).json({ message: 'Failed to Update Cart' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getCart = async (req, res) => {
    try {
        const { orderdBy } = req.body;
        let existingCart = await cart.findOne({ 'orderdBy.email': orderdBy });
        if (existingCart) {
            res.status(200).json({ cart: existingCart, message: 'Cart Details' });
        } else {
            res.status(202).json({ message: 'No Cart Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createOrder = async (req, res) => {
    try {
        const { items, paymentIntent, shipping, orderTotal, totalAfterDiscount, orderdBy } = req.body.orderDetails;
        let newOrder = await new order({ orderdBy, items, paymentIntent, shipping, orderTotal, totalAfterDiscount }).save();
        if (newOrder) {
            res.status(200).json({ message: 'Order Placed!' });
        } else {
            res.status(202).json({ message: 'Failed to Place Order' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await order.find({});
        if (orders) {
            res.status(200).json({ orders, message: 'Orders Details' })
        } else {
            res.status(202).json({ message: 'No Order Found' })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getOrdersByDriver = async (req, res) => {
    try {
        const { email } = req.user;
        const { driverStatus } = req.body;
        const orders = await order.find({});
        let arr = driverCommon(orders, email, driverStatus);
        if (arr) {
            res.status(200).json({ orders: arr, message: 'Orders Fetched Successfully!' })
        } else {
            res.status(202).json({ message: 'No Orders Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const driverCommon = (orders, email, driverStatus) => {
    let arr = [];
    orders?.map(order => {
        order?.items?.map(item => {
            if (item.assignedTo.email === email && driverStatus.includes(item.orderStatus.driver)) {
                let value = 0;
                item.cuisines.map(cuisine => {
                    value = value + (cuisine?.price * cuisine?.count)
                })
                arr.push({
                    cuisines: item.cuisines,
                    orderdBy: order.orderdBy,
                    orderFrom: item.orderFrom,
                    assignedTo: item.assignedTo,
                    orderStatus: item.orderStatus,
                    value,
                    _id: item._id
                });
            }
        })
    });
    return arr;
}

exports.getOrdersByRestaurant = async (req, res) => {
    try {
        const { email } = req.user;
        const { restaurantStatus } = req.body;
        const orders = await order.find({});
        let arr = restaurantCommon(orders, email, restaurantStatus);
        if (orders) {
            res.status(200).json({ items: arr, message: 'Orders Fetched Successfully!' })
        } else {
            res.status(202).json({ message: 'No Orders Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getOrdersByUser = async (req, res) => {
    try {
        const { email } = req.user;
        const { userOrderStatus } = req.body;
        const orders = await order.find({ 'orderdBy.email': email });
        let arr = [];
        orders?.map(order => {
            order?.items?.map(item => {
                if (userOrderStatus.includes(item.orderStatus.restaurant)) {
                    let value = 0;
                    item.cuisines.map(cuisine => {
                        value = value + (cuisine?.price * cuisine?.count)
                    })
                    arr.push({
                        cuisines: item.cuisines,
                        orderdBy: order.orderdBy,
                        orderFrom: item.orderFrom,
                        assignedTo: item.assignedTo,
                        orderStatus: item.orderStatus,
                        value,
                        _id: item._id
                    });
                }
            })
        });
        if (orders) {
            res.status(200).json({ items: arr, message: 'Orders Fetched Successfully!' })
        } else {
            res.status(202).json({ message: 'No Orders Found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.modifyOrderStatus = async (req, res) => {
    try {
        const { role } = req.body;
        const { orderdBy, itemId, orderStatus, assignedTo, email } = req.body.orderObj;
        let updatedOrder = await order.updateOne({ 'orderdBy.email': orderdBy.email, 'items._id': itemId }, { $set: { 'items.$.assignedTo': assignedTo, 'items.$.orderStatus': orderStatus } });
        if (updatedOrder) {
            let orders = await order.find({});
            let arr = (role === 'partner') ? restaurantCommon(orders, email, ['Order Placed', 'Order Confirmed', 'Order Dispatched']) : driverCommon(orders, email, ['Order Placed', 'Order Confirmed', 'Order Dispatched']);
            res.status(200).json({ items: arr, message: 'Existing Order Updated Successfully!' });
        } else {
            res.status(202).json({ message: 'Failed To Update Order!' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const restaurantCommon = (orders, email, restaurantStatus) => {
    let arr = [];
    orders?.map(order => {
        order?.items?.map(item => {
            if (item.orderFrom.email === email && restaurantStatus.includes(item.orderStatus.restaurant)) {
                let value = 0;
                item.cuisines.map(cuisine => {
                    value = value + (cuisine?.price * cuisine?.count)
                })
                arr.push({
                    cuisines: item.cuisines,
                    orderdBy: order.orderdBy,
                    assignedTo: item.assignedTo,
                    orderStatus: item.orderStatus,
                    value,
                    _id: item._id
                });
            }
        })
    });
    return arr;
}
