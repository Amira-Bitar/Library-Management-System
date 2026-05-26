const Reservation = require("../models/Reservation");
const Material = require("../models/library materials/Material");
const User = require("../models/users/User");
// Create
exports.createReservation = async (req, res) => {
 
    const material = await Material.findById(
      req.body.material
    );
    const existing = await Reservation.findOne({
      member: req.body.member,
      material: req.body.material,
    });

  if (existing) {
    const error = new Error("You already reserved this material");
    error.status = 400;
    throw error;
  }

  if (!material) {
    const error = new Error("Material not found");
    error.status = 404;
    throw error;
  }

    const member = await User.findById(req.body.member);
     if (!member) {
      const error = new Error("Member not found");
      error.status = 404;
      throw error;
    }
    if (!"member".includes(member.role)) {
    const error = new Error("Only members can reserve");
    error.status = 403; 
    throw error;
  }
     if (material.availableCopies > 0) {
      const error = new Error("Material is available. No need for reservation.");
      error.status = 400;
      throw error;
    }


    const queueCount =await Reservation.countDocuments({material: req.body.material});

    // create reservation
    const reservation =await Reservation.create({...req.body,
        queuePriority: queueCount + 1,
        autoCancelAfter: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
      });

    res.status(201).json(reservation);

};
// Get all
exports.getAllReservations = async (req, res) => {
 
    const data = await Reservation.find().populate("member", "name")
  .populate("material", "title");

    if (data.length === 0) {
          return res.status(200).json({ 
            success: true, 
            message: "there is no reservation",
            count: 0,
            data: [] 
          });}
    else
    res.status(200).json(data);
 
};

// Get one
exports.getReservationById = async (req, res) => {
 
    const data = await Reservation.findById(req.params.id).populate("member", "name")
        .populate("material", "title");
    if (!data) {
      const error = new Error("this reservation isn't found");
      error.status = 404;
      throw error;
    }
     res.status(200).json({
      success: true,
      data: data,
    });


};

// Update
exports.updateReservation = async (req, res) => {
 
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true , runValidators: true }
    ).populate("member", "name")
    .populate("material", "title");

    if (!updated) {
      const error = new Error("this reservation isn't found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(updated);
  
};

// Delete
exports.deleteReservation = async (req, res) => {

  const del = await Reservation.findByIdAndDelete(req.params.id);
  if (!del) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({ message: "Reservation deleted successfully" });
  
  
};