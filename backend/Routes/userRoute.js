const express = require("express");
const upload = require('../uploads/multerConfiguration');
const userRoute = express.Router();
const {
    getUsers,
    postUser,
    putUser,
    deleteUser,
    getOneUser,
    postUserProfile,
    signIn
} = require("../Controllers/userController"); 
const isAuth = require("../middleware/isAuth");
const isAutho = require('../middleware/isAutho');
const User = require("../models/User"); // Add this line to import the User model

userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth, isAutho(['user']), getOneUser);
userRoute.post("/users/uploads", upload.single('file'), postUser); 
userRoute.put("/users/:id", putUser); 
userRoute.delete("/users/:id", isAuth, async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Fetch the user to check if they are the owner of the account
      const userToDelete = await User.findById(userId);
  
      if (!userToDelete) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Check if the user making the request is either an admin or the owner of the account
      if (req.user.role === 'admin' || req.user.id === userId) {
        // If the user is an admin or the account owner, proceed with the deletion logic
        await deleteUser(req, res);
      } else {
        // If the user is a regular user trying to delete someone else's account, respond with a 403 Forbidden status
        res.status(403).json({ msg: "Access forbidden - Insufficient privileges" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
   
userRoute.post("/signIn", signIn);
module.exports = userRoute;
