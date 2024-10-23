// routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  limits: {
    fieldSize: 100 * 1024 * 1024, // 10 MB limit for field values
  },
});
const verifyToken = require("../middleware/verifyToken");
const {
  getAllTemplateByCreated,
  getTemplateById,
  createProduct,
  deleteTemplate,
  updateProduct,
} = require("../controllers/templateController");

// Route to get all templates
router.get("/getall", verifyToken, getAllTemplateByCreated);

// Route to get a specific template by ID
router.get("/gettemplate/:id", verifyToken, getTemplateById);

// Route to create a new template
router.post("/create", verifyToken, upload.none(), createProduct);
router.delete("/delete/:id", verifyToken, deleteTemplate);
router.put("/update/:id", verifyToken, upload.none(), updateProduct);
module.exports = router;
