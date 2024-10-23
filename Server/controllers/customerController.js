const Customer = require("../models/customerModel");

exports.createCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      address1,
      address2,
      city,
      country,
      postcode,
      phone,
      abn,
    } = req.body;

    const userId = req.user.userId;

    const newCustomer = new Customer({
      created_by: userId,
      name: name,
      email: email, // Email is unique but not primary key
      address1: address1,
      address2: address2,
      city: city,
      country: country,
      postcode: postcode,
      phone: phone,
      abn: abn,
    });

    const savedCustomer = await newCustomer.save();

    res.status(200).json({
      message: "Customer created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllCustomerByCreated = async (req, res) => {
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
        { email: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on email
        { city: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on city
        { country: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on country
      ],
    };

    // Find customers with search and pagination
    const customers = await Customer.find(searchFilter)
      .skip(skip) // Skip customers for pagination
      .limit(limit); // Limit the number of customers per page

    // Get the total number of customers for the user (with search applied)
    const totalCustomers = await Customer.countDocuments(searchFilter);

    // Check if there are no customers found for the user
    if (customers.length === 0) {
      return res.status(200).json({ customers: [] });
    }

    // Return the paginated and filtered customers along with pagination info
    res.status(200).json({
      message: "Customers retrieved successfully",
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

exports.getCustomerById = async (req, res) => {
  try {
    const userId = req.params.id; // Ensure this matches the parameter in the route
    console.log("User ID:", userId); // Log the user ID for debugging

    // Check if userId is valid
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the customer by userId
    const customer = await Customer.findOne({ _id: userId }); // Ensure 'userId' matches the field in the database

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

exports.updateCustomer = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const customerId = req.params.id; // Get customer ID from URL parameter

    // Retrieve the fields to be updated from the request body
    const {
      name,
      email,
      address1,
      address2,
      city,
      country,
      postcode,
      phone,
      abn,
    } = req.body;

    // Find the customer by customer ID
    const customer = await Customer.findOne({
      _id: customerId,
      created_by: userId,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not authorized" });
    }

    // Update the customer's details
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.address1 = address1 || customer.address1;
    customer.address2 = address2 || customer.address2;
    customer.city = city || customer.city;
    customer.country = country || customer.country;
    customer.postcode = postcode || customer.postcode;
    customer.phone = phone || customer.phone;
    customer.abn = abn || customer.abn;

    // Save the updated customer to the database
    const updatedCustomer = await customer.save();

    // Return the updated customer in the response
    res.status(200).json({
      message: "Customer updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const customerId = req.params.id; // Get customer ID from URL parameter

    // Find the customer by ID and check if it was created by the user
    const customer = await Customer.findOneAndDelete({
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
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUserCounts = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the request

    // Count all invoices created by this user
    const totalCount = await Customer.countDocuments({ created_by: userId });

    // Return all counts
    res.status(200).json({
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
