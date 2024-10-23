const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    // Get userId from the verified token

    const {
      name,

      price,
      description,
    } = req.body;

    const userId = req.user.userId; // This is set in the verifyToken middleware

    // Create a new project with an empty template and user ID
    const newProduct = new Product({
      created_by: userId, // Associate the project with the user
      name: name,
      description: description,
      price: price,
    });

    // // Save the project to the database
    const savedProject = await newProduct.save();

    // Return the project ID in the response
    res.status(200).json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllProductByCreated = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from the verified token

    // Pagination parameters: page and limit
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 customers per page if not provided
    const skip = (page - 1) * limit; // Calculate how many customers to skip based on the current page

    // Search parameters
    const searchQuery = req.query.search || ""; // Default to an empty string if no search query is provided

    // Build a search filter
    const searchFilter = {
      created_by: userId,
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on name
        { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on email
      ],
    };

    // Find customers with search and pagination
    const customers = await Product.find(searchFilter)
      .skip(skip) // Skip customers for pagination
      .limit(limit); // Limit the number of customers per page

    // Get the total number of customers for the user (with search applied)
    const totalCustomers = await Product.countDocuments(searchFilter);

    // Check if there are no customers found for the user
    if (customers.length === 0) {
      return res.status(200).json({ customers: [] });
    }

    // Return the paginated and filtered customers along with pagination info
    res.status(200).json({
      message: "Product retrieved successfully",
      page, // Current page
      limit, // Number of customers per page
      totalCustomers, // Total number of customers that match the search
      totalPages: Math.ceil(totalCustomers / limit), // Calculate total number of pages
      customers, // Customers for the current page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const userId = req.params.id; // Ensure this matches the parameter in the route

    // Check if userId is valid
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the customer by userId
    const customer = await Product.findOne({ _id: userId }); // Ensure 'userId' matches the field in the database

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Return the customer data
    res.status(200).json({
      customer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const customerId = req.params.id; // Get customer ID from URL parameter

    // Retrieve the fields to be updated from the request body
    const { name, description, price } = req.body;

    // Find the customer by customer ID
    const product = await Product.findOne({
      _id: customerId,
      created_by: userId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Customer not found or not authorized" });
    }

    product.name = name || product.name;
    product.description = description || product.email;
    product.price = price || product.price;

    // Save the updated customer to the database
    const updatedCustomer = await product.save();

    // Return the updated customer in the response
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const customerId = req.params.id; // Get customer ID from URL parameter

    // Find the customer by ID and check if it was created by the user
    const customer = await Product.findOneAndDelete({
      _id: customerId,
      created_by: userId,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not authorized" });
    }

    // Return a success message
    res.status(200).json({
      message: "Template deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getProductCounts = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the request

    // Count all invoices created by this user
    const totalCount = await Product.countDocuments({ created_by: userId });

    // Return all counts
    res.status(200).json({
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
