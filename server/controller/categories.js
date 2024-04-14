const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.YOUR_CLOUD_NAME,
  api_key: process.env.YOUR_API_KEY,
  api_secret: process.env.YOUR_API_SECRET,
});

// Configure multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "categories", // folder in your Cloudinary account
    // format: async (req, file) => "png", // or jpg, jpeg, etc.
    public_id: (req, file) => file.originalname, // use the original name for the file in Cloudinary
  },
});

// Set up multer for file upload
const upload = multer({ storage: storage });

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    // let cImage = req.file.filename;
    // const filePath = `../server/public/uploads/categories/${cImage}`;
    if (!cName || !cDescription || !cStatus || !req.file) {
      return res.json({ error: "All fields must be required" });
    }
    // if (!cName || !cDescription || !cStatus || !cImage) {
    //   fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     return res.json({ error: "All filled must be required" });
    //   });
    // } else {
    cName = toTitleCase(cName);
    try {
      let checkCategoryExists = await categoryModel.findOne({ cName: cName });

      if (checkCategoryExists) {
        return res.json({ error: "Category already exists" });
      } else {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        let newCategory = new categoryModel({
          cName,
          cDescription,
          cStatus,
          cImage: result.secure_url, // Save Cloudinary URL in database
        });

        await newCategory.save();
        return res.json({ success: "Category created successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error occurred while adding category" });
    }

    // try {
    //   let checkCategoryExists = await categoryModel.findOne({ cName: cName });
    //   if (checkCategoryExists) {
    //     fs.unlink(filePath, (err) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       return res.json({ error: "Category already exists" });
    //     });
    //   } else {
    //     let newCategory = new categoryModel({
    //       cName,
    //       cDescription,
    //       cStatus,
    //       cImage,
    //     });
    //     await newCategory.save((err) => {
    //       if (!err) {
    //         return res.json({ success: "Category created successfully" });
    //       }
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }
  // }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All filled must be required" });
    }
    try {
      let editCategory = categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });
      let edit = await editCategory.exec();
      if (edit) {
        return res.json({ success: "Category edit successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deletedCategoryFile = await categoryModel.findById(cId);
        const filePath = `../server/public/uploads/categories/${deletedCategoryFile.cImage}`;

        let deleteCategory = await categoryModel.findByIdAndDelete(cId);
        if (deleteCategory) {
          // Delete Image from uploads -> categories folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Category deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
