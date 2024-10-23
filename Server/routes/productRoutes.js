// routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createProduct,
  getAllProductByCreated,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductCounts,
} = require("../controllers/productController");

router.post("/create", verifyToken, createProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.get("/getProduct/:id", verifyToken, getProductById);
router.get("/getall", verifyToken, getAllProductByCreated);
router.get("/getcount", verifyToken, getProductCounts);

module.exports = router;
