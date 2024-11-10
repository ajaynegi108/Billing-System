const InvoiceTemplate = require("../models/templateModel");
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation
const pdf = require("html-pdf");
const poppler = require("pdf-poppler");
const fs = require("fs").promises;
function htmlToPdfBuffer(htmlContent) {
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
}
async function pdfToImageBuffer(pdfBuffer) {
  const pdfFilePath = "./temp.pdf";
  const outputFilePath = "./temp.png";

  // Save the PDF buffer to a temporary file
  await fs.writeFile(pdfFilePath, pdfBuffer);

  // Convert the PDF to PNG
  await poppler.convert(pdfFilePath, {
    format: "png",
    out_dir: ".",
    out_prefix: "temp",
    page: 1,
  });

  // Read the generated image file and encode it to base64
  const imageBuffer = await fs.readFile(outputFilePath);
  const base64Image = imageBuffer.toString("base64");

  // Cleanup temporary files
  await fs.unlink(pdfFilePath);
  await fs.unlink(outputFilePath);

  return base64Image;
}
exports.updateProduct = async (req, res) => {
  try {
    // Get userId from the verified token
    const userId = req.user.userId; // This is set in the verifyToken middleware

    // Get the template ID from the request parameters
    const { id } = req.params;

    // Access FormData using req.body
    const { name, description, content } = req.body;

    // Find the existing template by ID
    const existingTemplate = await InvoiceTemplate.findById(id);

    // Check if the template exists and is owned by the user
    if (!existingTemplate) {
      return res.status(404).json({ message: "Template not found." });
    }
    if (existingTemplate.created_by.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this template." });
    }

    // Convert content to an image and then to base64 (if content is updated)
    let base64Thumbnail;

    if (content) {
      const pdfBuffer = await htmlToPdfBuffer(content);
      base64Thumbnail = await pdfToImageBuffer(pdfBuffer);
    }

    // Update the template fields
    existingTemplate.name = name || existingTemplate.name; // Update only if provided
    existingTemplate.description = description || existingTemplate.description;
    existingTemplate.content = content || existingTemplate.content;
    existingTemplate.thumbnail = base64Thumbnail
      ? `data:image/png;base64,${base64Thumbnail}`
      : existingTemplate.thumbnail;

    // Save the updated template to the database
    const updatedTemplate = await existingTemplate.save();

    // Return a success response
    res.status(200).json({
      message: "Template updated successfully",
      templateId: updatedTemplate._id, // Include the updated template ID in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // Get userId from the verified token
    const userId = req.user.userId; // This is set in the verifyToken middleware

    // Access FormData using req.body
    const { name, description, content } = req.body;

    // Convert content to an image and then to base64
    const imageBuffer = await nodeHtmlToImage({
      html: content,
    });
    const base64Thumbnail = imageBuffer.toString("base64");

    // Create a new project with an empty template and user ID
    const newTemplate = new InvoiceTemplate({
      created_by: userId, // Associate the project with the user
      name: name,
      description: description,
      content: content,
      thumbnail: `data:image/png;base64,${base64Thumbnail}`,
    });

    // Save the project to the database
    const savedTemplate = await newTemplate.save();

    // Return the project ID in the response
    res.status(200).json({
      message: "Template created successfully",
      templateId: savedTemplate._id, // Include the saved template ID in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
// Get all templates
exports.getAllTemplateByCreated = async (req, res) => {
  try {
    const userId = req.user.userId;

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
    const templates = await InvoiceTemplate.find(searchFilter)
      .skip(skip) // Skip customers for pagination
      .limit(limit); // Limit the number of customers per page

    const totalTemplates = await InvoiceTemplate.countDocuments(searchFilter);

    // Check if there are no customers found for the user
    if (templates.length === 0) {
      return res.status(200).json({ templates: [] });
    }

    res.status(200).json({
      message: "Templates retrieved successfully",
      page, // Current page
      limit, // Number of customers per page
      totalTemplates, // Total number of customers that match the search
      totalPages: Math.ceil(totalTemplates / limit), // Calculate total number of pages
      templates, // Customers for the current page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the template by ID
    const template = await InvoiceTemplate.findById(id);

    // Check if the template exists
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Return the found template
    res.status(200).json({
      template,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the verified token
    const templateId = req.params.id; // Get customer ID from URL parameter

    // Find the customer by ID and check if it was created by the user
    const customer = await InvoiceTemplate.findOneAndDelete({
      _id: templateId,
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
