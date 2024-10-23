const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    created_by: {
      type: String, // Assuming this refers to a user ID or name
    },
    name: {
      type: String,
      default: null, // Allow null values
    },
    price: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
