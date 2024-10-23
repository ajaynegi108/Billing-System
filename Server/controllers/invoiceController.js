const Invoice = require("../models/invoiceModel");

exports.createInvoice = async (req, res) => {
  try {
    // Get userId from the verified token
    const {
      dynamicFields,
      products,
      invoiceType,
      invoiceStatus,
      invoiceDate,
      dueDate,
      total,
      abn,
      email,
      address1,
      address2,
      city,
      country,
      postcode,
      phone,
      name,
    } = req.body;
    console.log(name);
    const userId = req.user.userId; // This is set in the verifyToken middleware

    // Create a new invoice with static fields and dynamic fields
    const newInvoice = new Invoice({
      created_by: userId, // Associate the invoice with the user
      name: name, // Static fields
      email: email,
      address1: address1,
      address2: address2,
      city: city,
      country: country,
      postcode: postcode,
      phone: phone,
      abn: abn,
      product: products, // Products array
      total: total, // Total amount
      invoiceType: invoiceType, // Invoice type
      invoiceStatus: invoiceStatus, // Invoice status
      invoiceDate: invoiceDate, // Invoice creation date
      dueDate: dueDate, // Due date
      dynamicFields: dynamicFields, // Dynamic fields (key-value pairs)
    });

    // Save the invoice to the database
    const savedInvoice = await newInvoice.save();

    // Return success message in the response
    res.status(200).json({
      message: "Invoice created successfully",
      invoiceId: savedInvoice._id, // Optionally return the invoice ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllInvoiceByCreated = async (req, res) => {
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
      ],
    };

    // Find invoices with search and pagination
    const invoices = await Invoice.find(searchFilter)
      .skip(skip) // Skip invoices for pagination
      .limit(limit); // Limit the number of invoices per page

    // Get the total number of invoices for the user (with search applied)
    const totalInvoices = await Invoice.countDocuments(searchFilter);

    // Check if there are no invoices found for the user
    if (invoices.length === 0) {
      return res.status(200).json({ invoices: [] });
    }

    // Return the paginated and filtered invoices along with pagination info
    res.status(200).json({
      message: "invoices retrieved successfully",
      page, // Current page
      limit, // Number of invoices per page
      totalInvoices, // Total number of customers that match the search
      totalPages: Math.ceil(totalInvoices / limit), // Calculate total number of pages
      invoices, // Customers for the current page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const userId = req.params.id; // Ensure this matches the parameter in the route
    console.log("User ID:", userId); // Log the user ID for debugging

    // Check if userId is valid
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the customer by userId
    const invoice = await Invoice.findOne({ _id: userId }); // Ensure 'userId' matches the field in the database

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Return the customer data
    res.status(200).json({
      invoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const invoiceId = req.params.id; // Get customer ID from URL parameter

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
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      created_by: userId,
    });

    if (!invoice) {
      return res
        .status(404)
        .json({ message: "Invoice not found or not authorized" });
    }

    // Update the Invoice's details
    invoice.name = name || invoice.name;
    invoice.email = email || invoice.email;
    invoice.address1 = address1 || invoice.address1;
    invoice.address2 = address2 || invoice.address2;
    invoice.city = city || invoice.city;
    invoice.country = country || invoice.country;
    invoice.postcode = postcode || invoice.postcode;
    invoice.phone = phone || invoice.phone;
    invoice.abn = abn || invoice.abn;

    // Save the updated customer to the database
    const updatedInvoice = await invoice.save();

    // Return the updated customer in the response
    res.status(200).json({
      message: "Invoice updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const invoiceId = req.params.id; // Get customer ID from URL parameter

    // Find the customer by ID and check if it was created by the user
    const invoice = await Invoice.findOneAndDelete({
      _id: invoiceId,
      created_by: userId,
    });

    if (!invoice) {
      return res
        .status(404)
        .json({ message: "Invoice not found or not authorized" });
    }

    // Return a success message
    res.status(200).json({
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getInvoiceCounts = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the request

    // Count all invoices created by this user
    const totalCount = await Invoice.countDocuments({ created_by: userId });

    // Count open invoices created by this user
    const openCount = await Invoice.countDocuments({
      invoiceStatus: "open",
      created_by: userId,
    });

    // Count paid invoices created by this user
    const paidCount = await Invoice.countDocuments({
      invoiceStatus: "paid",
      created_by: userId,
    });

    // Return all counts
    res.status(200).json({
      totalCount,
      openCount,
      paidCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
