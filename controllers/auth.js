const user = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
    try {
        const { email } = req.user;
        const { firstName, lastName, dob, gender, contact, address, state, city, pinCode, role } = req.body.userDetails;
        let existingUser = await user.findOneAndUpdate({ email }, { firstName, lastName, dob, gender, contact, address, state, city, pinCode, role }, { new: true });
        if (existingUser) {
            res.status(200).json({ user: existingUser, message: 'Existing User Updated Successfully!' });
        } else {
            let newUser = await new user({ firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, role }).save();
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
        const { email } = req.body;
        let existingUser = await user.findOne({ email });
        if (existingUser) {
            res.status(200).json({ role: existingUser.role, message: 'Valid User' });
        }
        else {
            res.status(202).json({ message: 'No User Found' });
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
