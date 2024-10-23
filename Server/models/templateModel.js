const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    created_by: {
      type: String, // Assuming this refers to a user ID or name
    },
    name: {
      type: String,
      default: null, // Allow null values
    },
    description: {
      type: String,
      default: null, // Allow null values
    },

    content: {
      type: String,
      default: null, // Allow null values
    },

    thumbnail: {
      type: String,
      default: null, // Allow null values
    },
  },
  { timestamps: false } // Automatically adds createdAt and updatedAt fields
);

const InvoiceTemplate = mongoose.model("InvoiceTemplate", templateSchema);

module.exports = InvoiceTemplate;
