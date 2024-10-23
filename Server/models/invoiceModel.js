const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    created_by: {
      type: String,
      required: true, // Assuming this refers to a user ID or name
    },
    name: {
      type: String,
      default: null,
      required: true,
      // Allow null values
    },
    abn: {
      type: Number,
      default: null,
      required: true,
    },
    email: {
      type: String,
      default: null,
      required: true,
    },
    address1: {
      type: String,
      default: null,
      required: true,
    },
    address2: {
      type: String,
      default: null,
      required: true,
    },
    city: {
      type: String,
      default: null,
      required: true,
    },
    country: {
      type: String,
      default: null,
      required: true,
    },
    postcode: {
      type: String,
      default: null,
      required: true,
    },
    phone: {
      type: String,
      default: null,
      required: true,
    },
    product: {
      type: Array,
      default: null,
      required: true,
    },
    total: {
      type: Number,
      default: null,
      required: true,
    },
    invoiceType: {
      type: String,
      default: null,
      required: true,
    },
    invoiceStatus: {
      type: String,
      default: null,
      required: true,
    },
    invoiceDate: {
      type: Date,
      default: null,
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
      required: true,
    },
    dynamicFields: {
      type: Map,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
