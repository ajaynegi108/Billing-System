const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Get the token from cookies or headers
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach the decoded token data to the request object

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error);
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = verifyToken;
