const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    created_by: {
      type: String, // Assuming this refers to a user ID or name
    },
    name: {
      type: String,
      default: null, // Allow null values
    },
    abn: {
      type: Number,
      default: null,
    },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    address1: {
      type: String,
      default: null,
    },
    address2: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    postcode: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
