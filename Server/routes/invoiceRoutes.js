// routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createInvoice,
  getAllInvoiceByCreated,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  getInvoiceCounts,
} = require("../controllers/invoiceController");

router.post("/create", verifyToken, createInvoice);
router.put("/update/:id", verifyToken, updateInvoice);
router.delete("/delete/:id", verifyToken, deleteInvoice);
router.get("/getinvoice/:id", verifyToken, getInvoiceById);
router.get("/getall", verifyToken, getAllInvoiceByCreated);
router.get("/getcount", verifyToken, getInvoiceCounts);

module.exports = router;
