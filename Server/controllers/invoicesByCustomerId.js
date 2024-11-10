const Invoice = require("../models/invoiceModel");
const Customer = require("../models/customerModel");

exports.getInvoiceAll = async (req, res) => {
  const userId = req.user.userId; // Get user ID from authenticated user
  const {
    page = 1,
    limit = 10,
    sort = "invoiceStatus",
    sortOrder = "asc",
  } = req.query;

  try {
    // Fetch the user's email from the Customer collection based on userId
    const userData = await Customer.findOne({ _id: userId }, { email: 1 });

    if (!userData || !userData.email) {
      return res.status(404).json({ message: "User email not found" });
    }

    const email = userData.email; // Store user's email to filter invoices

    // Build query to filter invoices by email and status ("open", "paid")
    const query = {
      email,
      invoiceStatus: { $in: ["open", "paid"] },
      status: "active",
    };

    // Determine sorting order based on sortOrder ("asc" or "desc")
    const order = sortOrder === "desc" ? -1 : 1;

    // Calculate total number of invoices for pagination
    const totalInvoices = await Invoice.countDocuments(query);

    // Fetch paginated, sorted, and filtered invoices
    const invoices = await Invoice.find(query)
      .sort({ [sort]: order }) // Sort by the specified field (e.g., "invoiceStatus")
      .skip((page - 1) * parseInt(limit)) // Skip documents based on the current page
      .limit(parseInt(limit)); // Limit the number of documents per page

    // Send response with invoices and pagination information
    res.status(200).json({
      totalInvoices,
      totalPages: Math.ceil(totalInvoices / limit),
      currentPage: parseInt(page),
      invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
