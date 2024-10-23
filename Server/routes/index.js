const express = require("express");
const router = express.Router();

// Import individual route modules
const authRoutes = require("./authRoutes");

const customerRoutes = require("./customerRoutes");
const productRoutes = require("./productRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const templateRoutes = require("./templateRoutes");
// Use the route modules
router.use("/auth", authRoutes);

router.use("/customer", customerRoutes);
router.use("/product", productRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/template", templateRoutes);

module.exports = router;
