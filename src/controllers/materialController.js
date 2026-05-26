const Material = require("../models/library materials/Material");
const Book = require("../models/library materials/Book");
const Magazine = require("../models/library materials/Magazine");
const CD = require("../models/library materials/Cd");
const Map = require("../models/library materials/map");

// Create
exports.createMaterial = async (req, res) => {

    let newMaterial;
    let materialType;

    // Detect material type automatically

    // BOOK
    if (req.body.author ||req.body.ISBN|| req.body.publisher|| req.body.publicationYear) 
    {
      materialType = "book";
    }

    // MAGAZINE
    else if (req.body.issueNumber ||req.body.month ||req.body.year) 
      {
      materialType = "magazine";
    }

    // CD
    else if (req.body.artist ) 
    {
      materialType = "cd";
    }

    // MAP
    else if (req.body.region ) {
      materialType = "map";
    }

    else {
      const error = new Error("Cannot determine material type");
      error.status = 400;
      throw error;
    }

    // Create material
    switch (materialType) {

      case "book":
        newMaterial = await Book.create(req.body);
        break;

      case "magazine":
        newMaterial = await Magazine.create(req.body);
        break;

      case "cd":
        newMaterial = await CD.create(req.body);
        break;

      case "map":
        newMaterial = await Map.create(req.body);
        break;
    }

    const materialObject = newMaterial.toObject();

    delete materialObject.__v;

    res.status(201).json(materialObject);


  
};

// Get all
exports.getAllMaterials = async (req, res) => {

    const data = await Material.find().select('-__v');
    if (data.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: "there is no material",
        count: 0,
        data: [] 
      });}
    else
    {
       return res.status(200).json({ 
        data
      });
    }
    


};

// Get one
exports.getMaterialById = async (req, res) => {
  
    const data = await Material.findById(req.params.id);
    if (!data) {
      const error = new Error("Material not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);

};

// Update
exports.updateMaterial = async (req, res) => {

    const updated = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true , runValidators: true }
    );
    if (!updated) {
      const error = new Error("Material not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(updated);
  
};

// Delete
exports.deleteMaterial = async (req, res) => {

    
  const deleted = await Material.findByIdAndDelete(req.params.id);

  if (!deleted) {
    const error = new Error("Material not found");
    error.status = 404;
    throw error;
  }
    res.status(200).json({
      message: "Material deleted successfully",
    });
 
};