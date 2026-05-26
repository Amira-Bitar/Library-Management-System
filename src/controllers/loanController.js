const Loan = require("../models/Loan");
const Material = require("../models/library materials/Material");
const User = require("../models/users/User");
// Create Loan
exports.createLoan = async (req, res) => {
  const material = await Material.findById(req.body.material);
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
  
  if (member.role !== "member") {
    const error = new Error("Only users with 'member' role can borrow materials");
    error.status = 403; 
    throw error;
  }

  const librarian = await User.findById(req.body.librarian);
  if (!librarian) {
    const error = new Error("Librarian not found");
    error.status = 404;
    throw error;
  }
if (!"librarian".includes(librarian.role)) {
    const error = new Error("Only librarians or admins can create loans");
    error.status = 403; 
    throw error;
  }
  if (material.availableCopies <= 0) {
    const error = new Error("Material is not available");
    error.status = 400;
    throw error;
  }

  const loanDate = req.body.loanDate ? new Date(req.body.loanDate) : new Date();

  const dueDate = new Date(loanDate);
  dueDate.setDate(dueDate.getDate() + 14);

  const loan = await Loan.create({
    ...req.body,
    loanDate,
    dueDate,
  });

  material.availableCopies -= 1;
  await material.save();

  res.status(201).json(loan);
};

// Get all
exports.getAllLoans = async (req, res) => {
 
    await updateOverdueLoans();
    const data = await Loan.find()
      .populate("member", "name email")
      .populate("material", "title materialType")
      .populate("librarian", "name");
      
    if (data.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: "there is no loans",
        count: 0,
        data: [] 
      });}
    else
    res.status(200).json(data);
 
};

// Get one
exports.getLoanById = async (req, res) => {
  await updateOverdueLoans();

  const data = await Loan.findById(req.params.id)
    .populate("member", "name email")
    .populate("material", "title materialType")
    .populate("librarian", "name");

  if (!data) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json(data);
};

// Update
exports.updateLoan = async (req, res) => {
  const updated = await Loan.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
    .populate("member", "name email")
    .populate("material", "title materialType")
    .populate("librarian", "name");

  if (!updated) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json(updated);
};

// Delete
exports.deleteLoan = async (req, res) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  const material = await Material.findById(loan.material);

  if (material) {
    material.availableCopies += 1;
    await material.save();
  }

  await loan.deleteOne();

  res.status(200).json({
    message: "Loan deleted successfully",
  });
};

exports.returnLoan = async (req, res) => {
  const loan = await Loan.findById(req.params.id)
    .populate("member", "name email")
    .populate("material", "title materialType")
    .populate("librarian", "name");

  if (!loan) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  if (loan.status === "returned") {
    const error = new Error("Loan already returned");
    error.status = 400;
    throw error;
  }

  const today = new Date();

  if (today > loan.dueDate) {
    const lateDays = Math.ceil((today - loan.dueDate) / (1000 * 60 * 60 * 24));
    loan.totalFineAmount = lateDays * loan.finePerDay;
  } else {
    loan.totalFineAmount = 0;
  }

  loan.status = "returned";
  loan.paymentStatus = "paid";
  loan.actualReturnDate = today;

  await loan.save();

  const material = await Material.findById(loan.material);

  if (material) {
    material.availableCopies += 1;
    await material.save();
  }

  res.status(200).json(loan);
};
const updateOverdueLoans = async () => {
  const now = new Date();

  const overdueLoans = await Loan.find({
    status: { $in: ["active", "overdue"] },
    dueDate: { $lt: now },
  });

  for (let loan of overdueLoans) {
    const overdueDays = Math.ceil(
      (now - loan.dueDate) / (1000 * 60 * 60 * 24)
    );

    loan.status = "overdue";
    loan.totalFineAmount = overdueDays * loan.finePerDay;

    await loan.save();
  }
};