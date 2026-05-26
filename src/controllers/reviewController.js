const Review = require("../models/Review");
const User = require("../models/users/User");
// Create
exports.createReview = async (req, res) => {
     const member = await User.findById(req.body.member);
    if (!member) {
        const error = new Error("Member not found");
        error.status = 404;
        throw error;
        }
    if (member.role !== "member") {
    const error = new Error("Only members can reserve");
    error.status = 403; 
    throw error;
  }
    const review = await Review.create(req.body);//currentl i will sind user id in the bode
    

    res.status(201).json(review);
  
};

// Get all
exports.getAllReviews = async (req, res) => {
 
    const data = await Review.find().populate("member", "name")
    .populate("material", "title");
    if (data.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: "there is no reviews",
        count: 0,
        data: [] 
      });}
    else
    res.status(200).json(data);
  
};

// Get one
exports.getReviewById = async (req, res) => {

    const data = await Review.findById(req.params.id).populate("member", "name")
  .populate("material", "title");
   if (!data) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }
    res.status(200).json(data);

};

// Update
exports.updateReview = async (req, res) => {

    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
       { new: true , runValidators: true }
    ).populate("member", "name")
     .populate("material", "title");
     if (!updated) {
      const error = new Error("Review not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(updated);
 
};

// Delete
exports.deleteReview = async (req, res) => {
  
    const deleted = await Review.findByIdAndDelete(req.params.id);

   
  if (!deleted) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }
    res.status(200).json({
      message: "Review deleted successfully",
    });
 
};