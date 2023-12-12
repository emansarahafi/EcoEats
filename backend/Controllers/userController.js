const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Get all users
const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        console.log(users);
        response.status(200).json({ users: users });
    } catch (error) {
        response.status(500).json({ msg: "Error on getting users" });
    }
};

// Get one user
const getOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const foundUser = await User.findById(id);
        if (foundUser) {
            res.status(200).json({ user: foundUser });
        } else {
            res.status(404).json({ msg: "No user found with the given ID" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error on retrieving the user" });
    }
};

// Post one user
const postUser = async (req, res) => {
    try {
        let profileImagePath = null; // Set default value to null

        // Check if a file was uploaded
        if (req.file) {
            // If a file was uploaded, save the file path
            // You can save the file path to the 'profileImagePath' field in your user schema
            // Modify this line based on your schema structure
            profileImagePath = req.file.path;
        }

        // Proceed with saving other user information (including optional file path)
        const { userName, email, dob, phoneNumber, address, password } = req.body;
        const newUser = new User({
            userName: userName,
            email: email,
            dob: dob,
            phoneNumber: phoneNumber,
            address: address,
            password: password,
            profileImagePath: profileImagePath, // Include the file path if it exists
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while creating user.');
    }
};


// Update one user
const putUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(user);
    try {
        await User.findByIdAndUpdate(id, user);
        res.status(200).json({ msg: "Update success" });
    } catch (error) {
        res.status(500).json({ msg: "Error on updating user" });
    }
};

// Delete one user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "Delete done" });
    } catch (error) {
        res.status(500).json({ msg: "Error on deleting user" });
    }
};

const signIn = async (req, res) => {
    const user = req.body;
    try {
        const foundUser = await User.findOne({ email: user.email });
        if (foundUser) {
            if (user.password === foundUser.password) {
                const token = jwt.sign(
                    { id: foundUser._id, role: foundUser.role },
                    process.env.JWT_SECRET
                );
                res.status(200).json({ user: foundUser, token: token });
            } else {
                res.status(400).json({ msg: "Wrong password" });
            }
        } else {
            return res.status(400).json({ msg: "User not registered" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser, signIn };
