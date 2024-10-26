const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true }, // Required field
    fullname: { type: String, required: true }, // Required field
    password: { type: String, required: true }, // Required and minimum length
    role: { type: Number, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email format validation
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
