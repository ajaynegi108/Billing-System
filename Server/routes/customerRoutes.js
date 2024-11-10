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

const { getInvoiceAll } = require("../controllers/invoicesByCustomerId");

router.post("/create", verifyToken, createCustomer);
router.put("/update/:id", verifyToken, updateCustomer);
router.delete("/delete/:id", verifyToken, deleteCustomer);
router.get("/getcustomer/:id", verifyToken, getCustomerById);
router.get("/getall", verifyToken, getAllCustomerByCreated);
router.get("/getcount", verifyToken, getUserCounts);

router.get("/getallinvoices", verifyToken, getInvoiceAll);

//

module.exports = router;
