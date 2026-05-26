const User = require("../models/users/User");
const Manager = require("../models/users/Manager");
const Member = require("../models/users/Member");
const Librarian = require("../models/users/Librarian");

// Create
exports.createUser = async (req, res) => {
 
    let newUser;
    let role;
    if (req.body.address ||req.body.dateOfBirth ||req.body.membershipNumber) 
    {
      role = "member";
    }

    else if (req.body.responsibleDepartment) {
      role = "librarian";
    }

    
    else {
      role = "manager";
    }

    // Create user based on detected role
    switch (role) {

      case "member":
        newUser = await Member.create(req.body);
        break;

      case "librarian":
        newUser = await Librarian.create(req.body);
        break;

      case "manager":
        newUser = await Manager.create(req.body);
        break;

     default: {
      const error = new Error("Invalid user data");
      error.status = 400;
      throw error;
    }
    }

    const userObject = newUser.toObject();

    delete userObject.password;
    delete userObject.__v;

    res.status(201).json(userObject);

 

  
};
// Get all
exports.getAllUsers = async (req, res) => {

    const data = await User.find().select('-password -__v');
    if (data.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: "there is no users",
        count: 0,
        data: [] 
      });}
    else
    res.status(200).json(data);
  
};

// Get one
exports.getUserById = async (req, res) => {
 
    const data = await User.findById(req.params.id).select('-password -__v');

  if (!data) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
    res.status(200).json(data);

};

// Update
exports.updateUser = async (req, res) => {

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
        { new: true , runValidators: true }
    ).select('-password -__v');

  if (!updated) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
    res.status(200).json(updated);
 
};

// Delete
exports.deleteUser = async (req, res) => {

    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  
};