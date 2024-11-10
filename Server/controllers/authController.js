const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Customer = require("../models/customerModel");
//Signup

exports.signup = async (req, res) => {
  const {
    companyName,
    password,

    phone,
    fullname,
    email,
  } = req.body;

  try {
    // Create a new user instance (Mongoose will validate fields)
    const newUser = new User({
      companyName,
      password, // We will hash it below

      fullname,

      phone,

      email,
    });

    // Validate before saving
    await newUser.validate(); // This will throw an error if validation fails

    // Hash the password
    const saltRounds = 10;
    newUser.password = await bcrypt.hash(password, saltRounds);

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password, type } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    var user = "";
    if (type === "customer") {
      user = await Customer.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate Access Token
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    // Include the user's ID in the response
    res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user_id: user._id, // Send the user's ID
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Refresh token function
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required." });
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token." });
      }

      const newAccessToken = jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  // Clear both accessToken and refreshToken cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully" });
};

exports.forget = async (req, res) => {
  const { email, type } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the user exists
    var user = "";
    if (type === "customer") {
      user = await Customer.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }

    // Generate a token with the user's ID
    const resetToken = jwt.sign(
      { userId: user._id, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Save the reset token to the user's record
    user.resetToken = resetToken;
    await user.save();

    // Configure nodemailer to send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "negi.ajay108@gmail.com",
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email content with reset link
    var resetLink = "";
    if (type === "admin") {
      // resetLink = `http://localhost:5173/confirm/admin/${resetToken}`;
      const resetLink = `https://billing-system-three.vercel.app/confirm/admin/${resetToken}`;
    } else {
      // resetLink = `http://localhost:5173/confirm/customer/${resetToken}`;
      const resetLink = `https://billing-system-three.vercel.app/confirm/admin/${resetToken}`;
    }
    // const resetLink = `https://billing-system-three.vercel.app/confirm/${resetToken}`;

    const mailOptions = {
      from: "hariom@techomsystems.com.au",
      to: email,
      subject: "Reset Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Reset link sent to your email.",
      user_id: user._id, // Optionally include user ID
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword, type } = req.body;

  // Validate input
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const email = decoded.email;

    // Find the user by ID
    var user = "";
    if (type === "customer") {
      user = await Customer.findOne({ email });
    } else {
      user = await User.findOne({ userId });
    }

    if (!user || user.resetToken !== token) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
