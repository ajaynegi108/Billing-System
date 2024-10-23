// routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createCustomer,
  getAllCustomerByCreated,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getUserCounts,
} = require("../controllers/customerController");

router.post("/create", verifyToken, createCustomer);
router.put("/update/:id", verifyToken, updateCustomer);
router.delete("/delete/:id", verifyToken, deleteCustomer);
router.get("/getcustomer/:id", verifyToken, getCustomerById);
router.get("/getall", verifyToken, getAllCustomerByCreated);
router.get("/getcount", verifyToken, getUserCounts);

module.exports = router;
