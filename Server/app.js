// server.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SKEY);
const routes = require("./routes");
const app = express();
const con = require("./config/db");
// Middleware
con();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173", // Frontend development URL
  "https://your-frontend-production-url.com", // Production frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies to be sent
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://invoice-backend-ocfk.onrender.com",
    ], // Replace with your frontend URL
    credentials: true, // Allows sending cookies with requests
  })
);

// Routes
app.use("/api", routes);
// Increase the payload size limit (adjust size as needed)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
