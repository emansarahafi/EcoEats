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
const isAuth = require("../middleware/isAuth")
const isAutho = require('../middleware/isAutho')
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth,isAutho(['user']), getOneUser);
userRoute.post("/users/uploads", upload.single('file'), postUser); 
userRoute.put("/users/:id", putUser); 
userRoute.delete("/users/:id", isAuth, (req, res) => {
  const userId = req.params.id;
  // Check if the user making the request is either an admin or the owner of the account
  if (req.user.role === 'admin' || req.user.id === userId) {
    // If the user is an admin or the account owner, proceed with the deletion logic
    deleteUser(req, res);
  } else {
    // If the user is a regular user trying to delete someone else's account, respond with a 403 Forbidden status
    res.status(403).json({ msg: "Access forbidden - Insufficient privileges" });
  }
});

userRoute.post("/signIn", signIn);
module.exports = userRoute;