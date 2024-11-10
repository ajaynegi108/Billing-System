const Invoice = require("../models/invoiceModel");
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const stripe = require("stripe")(process.env.STRIPE_SKEY);

const { ObjectId } = require("mongodb");

exports.createInvoice = async (req, res) => {
  try {
    // Destructure the body to get invoice data
    const {
      dynamicFields,
      products,
      invoiceType,
      invoiceStatus,
      invoiceDate,
      dueDate,
      subtotal,
      totalamount,
      tax,
      gst,
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
      subtotal: subtotal, // Subtotal amount
      invoiceStatus: invoiceStatus, // Invoice status
      invoiceDate: invoiceDate, // Invoice creation date
      dueDate: dueDate, // Due date
      dynamicFields: dynamicFields, // Dynamic fields (key-value pairs)
      totalAmount: totalamount, // Total amount
      gst: gst, // GST
      tax: tax, // Tax
    });

    // Generate HTML content
    const htmlContent = `
      <div style="width: 100%; padding: 8px; background: #fff; border-radius: 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 16px; background: #e0f7fa;">
              <h1 style="font-size: 24px; color: #0277bd; margin: 0;">TechOm Systems Pty Ltd</h1>
              <p style="font-size: 18px; color: #757575; margin: 0;">ABN: 41849985686</p>
            </td>
            <td style="padding: 16px; background: #e0f7fa; text-align: right;">
              <h1 style="font-size: 24px; color: #0277bd; margin: 0;">INVOICE</h1>
            </td>
          </tr>
        </table>
        
        <div style="text-align: right; margin-bottom: 16px; margin-right:10px">
       
          <p style="color: #757575;">Invoice Date: ${invoiceDate}</p>
          <p style="color: #757575;">Due Date: ${dueDate}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px; border: 1px solid #e0e0e0;">
              <h2 style="font-size: 18px; font-weight: bold; margin: 0;">From:</h2>
              <p style="margin: 0;">Ground Floor</p>
              <p style="margin: 0;">470 St Kilda Road, Melbourne VIC 3004</p>
              <p style="margin: 0;">Phone: 0452392167</p>
              <p style="margin: 0;">Email: hariom@techsystems.com.au</p>
            </td>
            <td style="padding: 16px; border: 1px solid #e0e0e0;">
              <h2 style="font-size: 18px; font-weight: bold; margin: 0;">To:</h2>
              <p style="color: #757575; margin: 0;">${name}</p>
              <p style="color: #757575; margin: 0;">${address1} ${address2}</p>
              <p style="color: #757575; margin: 0;">${city}, ${country}</p>
              <p style="color: #757575; margin: 0;">Phone: ${phone}, Email: ${email}</p>
            </td>
          </tr>
        </table>

        <table style="width: 100%; border: 1px solid #e0e0e0; margin-bottom: 24px; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Service</th>
              <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Description</th>
              <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Quantity</th>
              <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Price</th>
              <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>

        <div style="font-weight: bold; padding: 16px; background-color: #f9f9f9; text-align: right;">
          <p>Subtotal: ${subtotal}</p>
          <p>GST: ${gst}</p>
          <p>Total: ${totalamount}</p>
        </div>

        <footer style="margin-top: 24px; text-align: center;">
          <p>Thank you for your business!</p>
        </footer>
      </div>
    `;

    // Convert HTML content to Base64

    const dataUrl = await toPng(htmlContent);
    // Add base64 to the invoice document
    const base64Image = dataUrl.replace(/^data:image\/png;base64,/, ""); // Remove prefix if you want just base64

    newInvoice.thumbnail = base64Image;

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
    const { ObjectId } = require("mongodb");

    const searchFilter = {
      created_by: userId,
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        // Check if searchQuery is a valid ObjectId
        ...(ObjectId.isValid(searchQuery)
          ? [{ _id: ObjectId(searchQuery) }]
          : []),
        { invoiceStatus: { $regex: searchQuery, $options: "i" } },
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

exports.sendInvoice = async (req, res) => {
  try {
    // Extract data from the request
    const { currentId } = req.body;
    const invoiceData = await Invoice.findOne({ _id: currentId });

    // Check if the invoiceData exists
    if (!invoiceData) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Create a transporter object with your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "negi.ajay108@gmail.com",
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Function to format date
    function formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date string");

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    }

    // Convert ObjectId to string for invoice ID
    const invoiceIdString = invoiceData._id.toString();

    // Compose the invoice email HTML content
    const htmlContent = `
    <div style="width: 100%; padding: 8px; background: #fff; border-radius: 8px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 16px; background: #e0f7fa;">
            <h1 style="font-size: 24px; color: #0277bd; margin: 0;">TechOm Systems Pty Ltd</h1>
            <p style="font-size: 18px; color: #757575; margin: 0;">ABN: 41849985686</p>
          </td>
          <td style="padding: 16px; background: #e0f7fa; text-align: right;">
            <h1 style="font-size: 24px; color: #0277bd; margin: 0;">INVOICE</h1>
          </td>
        </tr>
      </table>
      
      <div style="text-align: right; margin-bottom: 16px; margin-right:10px">
        <h2 style="font-size: 20px; color: #0277bd;">Invoice No: TOS${invoiceIdString.slice(
          -4
        )}</h2>
        <p style="color: #757575;">Invoice Date: ${formatDate(
          invoiceData.invoiceDate
        )}</p>
        <p style="color: #757575;">Due Date: ${formatDate(
          invoiceData.dueDate
        )}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 16px; border: 1px solid #e0e0e0;">
            <h2 style="font-size: 18px; font-weight: bold; margin: 0;">From:</h2>
            <p style="margin: 0;">Ground Floor</p>
            <p style="margin: 0;">470 St Kilda Road, Melbourne VIC 3004</p>
            <p style="margin: 0;">Phone: 0452392167</p>
            <p style="margin: 0;">Email: hariom@techsystems.com.au</p>
          </td>
          <td style="padding: 16px; border: 1px solid #e0e0e0;">
            <h2 style="font-size: 18px; font-weight: bold; margin: 0;">To:</h2>
            <p style="color: #757575; margin: 0;">${invoiceData.name}</p>
            <p style="color: #757575; margin: 0;">${invoiceData.address1} ${
      invoiceData.address2
    }</p>
            <p style="color: #757575; margin: 0;">${invoiceData.city}, ${
      invoiceData.country
    }</p>
            <p style="color: #757575; margin: 0;">Phone: ${
              invoiceData.phone
            }, Email: ${invoiceData.email}</p>
            ${
              invoiceData.dynamicFields &&
              invoiceData.dynamicFields instanceof Map
                ? Array.from(invoiceData.dynamicFields.entries())
                    .map(
                      ([key, value]) =>
                        `<p style="color: #757575; margin: 0;">${key}: ${value}</p>`
                    )
                    .join("")
                : '<p style="color: #757575; margin: 0;">No additional fields provided.</p>'
            }
          </td>
        </tr>
      </table>

      <table style="width: 100%; border: 1px solid #e0e0e0; margin-bottom: 24px; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Service</th>
            <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Description</th>
            <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Quantity</th>
            <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Price</th>
            <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${
            invoiceData.product
              ? invoiceData.product
                  .map(
                    (item, index) => `
                      <tr style="background-color: ${
                        index % 2 === 0 ? "#f9f9f9" : "#fff"
                      };">
                        <td style="border: 1px solid #e0e0e0; padding: 8px;">${
                          item.name
                        }</td>
                        <td style="border: 1px solid #e0e0e0; padding: 8px;">${
                          item.description
                        }</td>
                        <td style="border: 1px solid #e0e0e0; padding: 8px;">${
                          item.quantity
                        }</td>
                        <td style="border: 1px solid #e0e0e0; padding: 8px;">${item.price.toFixed(
                          2
                        )}</td>
                        <td style="border: 1px solid #e0e0e0; padding: 8px;">${(
                          item.quantity * item.price
                        ).toFixed(2)}</td>
                      </tr>`
                  )
                  .join("")
              : ""
          }
        </tbody>
      </table>

      <div style="font-weight: bold; padding: 16px; background-color: #f9f9f9; text-align: right;">
        <p style="margin: 0;">Subtotal: ${invoiceData.subtotal}</p>
        <hr style="margin: 16px 0;" />
        <p style="margin: 0;">Tax: ${invoiceData.gst}</p>
        <hr style="margin: 16px 0;" />
        <p style="margin: 0;">Total: ${invoiceData.totalAmount}</p>
      </div>

      <footer style="margin-top: 24px; text-align: center; color: #757575;">
        <p style="margin: 0;">Thank you for your business!</p>
      </footer>
    </div>
  `;

    // Generate PDF from HTML content
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        console.error("Error creating PDF:", err);
        return res.status(500).json({ message: "Failed to create PDF" });
      }

      // Compose the email with attachment
      const mailOptions = {
        from: "hariom@techomsystems.com.au",
        to: invoiceData.email,
        subject: `Invoice Number TOS${invoiceIdString.slice(-4)}`,
        html: `<p>Please find the attached invoice.</p>
        <p><a href="http://localhost:5173/customer/invoice/${invoiceData._id}">Click Here to Pay</a></p>
// <p><a href="https://billing-system-three.vercel.app/customer/invoice/${invoiceData._id}">Click Here to Pay</a></p>
`,
        attachments: [
          {
            filename: `Invoice_TOS${invoiceIdString.slice(-4)}.pdf`,
            content: buffer,
          },
        ],
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res
            .status(500)
            .json({ message: "Failed to send email", error: error.toString() });
        }

        // Send success response

        res.status(200).json({
          message: "Invoice sent successfully",
          info: info.response,
        });
      });
    });
    await Invoice.findOneAndUpdate(
      { _id: currentId },
      { status: "active" }, // Set status to "active"
      { new: true } // Optionally return the updated document
    );
  } catch (error) {
    // Handle error
    console.error("Error sending invoice email:", error);
    res.status(500).json({
      message: "Failed to send invoice email",
      error: error.toString(),
    });
  }
};

exports.MakePayment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items,
      mode: "payment",

      // success_url: "http://localhost:5173/success",
      // cancel_url: "http://localhost:5173/cancel",
      success_url: "https://billing-system-three.vercel.app/success",
      cancel_url: "https://billing-system-three.vercel.app/cancel",
    });

    console.log(session);

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
