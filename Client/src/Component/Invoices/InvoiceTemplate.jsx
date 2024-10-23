import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import api from "../utils/api";

export default function InvoiceTemplate({ currentId }) {
  const [invoiceData, setInvoiceData] = useState("");

  useEffect(() => {
    const getInvoiceDetails = async () => {
      try {
        const response = await api.get(`invoice/getinvoice/${currentId}`);
        setInvoiceData(response.data.invoice);
      } catch (error) {
        console.log(error);
      }
    };
    getInvoiceDetails();
  }, [currentId]);

  const downloadInvoice = () => {
    const input = document.getElementById("invoice");

    html2canvas(input, { scale: 1.5 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_${invoiceData.invoiceNumber}.pdf`);
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Invalid date string");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {invoiceData && (
        <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div id="invoice" className="p-4">
            <header className="flex justify-between items-center mb-6 bg-blue-100 p-4 rounded">
              <div>
                <h1 className="text-3xl text-blue-700">
                  TechOm Systems Pty Ltd
                </h1>
                <p className="text-xl text-gray-600">ABN: 41849985686</p>
              </div>
              <h1 className="text-3xl text-blue-600">INVOICE</h1>
            </header>
            <div className="text-right mb-4">
              <h2 className="text-xl text-blue-600">
                Invoice No: TOS{invoiceData._id.slice(-4)}
              </h2>
              <p className="text-gray-600">
                Invoice Date: {formatDate(invoiceData?.invoiceDate)}
              </p>
              <p className="text-gray-600">
                Due Date: {formatDate(invoiceData?.dueDate)}
              </p>
            </div>

            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">From:</h2>
                <p>Ground Floor</p>
                <p>470 St Kilda Road, Melbourne VIC 3004</p>
                <p>Phone: 0452392167</p>
                <p>Email: hariom@techsystems.com.au</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-semibold">To:</h2>
                <p className="text-gray-700">{invoiceData.name}</p>
                <p className="text-gray-700">
                  {invoiceData.address1} {invoiceData.address2}
                </p>
                <p className="text-gray-700">
                  {invoiceData.city}, {invoiceData.country}
                </p>
                <p className="text-gray-700">
                  Phone: {invoiceData.phone}, Email: {invoiceData.email}
                </p>
                {Object.entries(invoiceData?.dynamicFields).map(
                  ([key, value]) => (
                    <p key={key} className="text-gray-700">
                      {key}: {value}
                    </p>
                  )
                )}
              </div>
            </div>

            <table className="min-w-full border border-gray-200 mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">
                    Service
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Quantity
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Price
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.product?.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-3">{item.name}</td>
                    <td className="border border-gray-300 p-3">
                      {item.description}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-3">
                      ${item.price?.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="font-semibold bg-gray-50 p-4 text-right">
              <h3>Subtotal: ${invoiceData?.total.toFixed(2)}</h3>
              <hr className="m-4" />
              <h3>Tax: ${(invoiceData?.total * 0.1).toFixed(2)}</h3>
              <hr className="m-4" />
              <h3>Total: ${(invoiceData?.total * 1.1).toFixed(2)}</h3>
            </div>

            <footer className="mt-8 text-center text-gray-600">
              <p>Thank you for your business!</p>
            </footer>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={downloadInvoice}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download Invoice
            </button>
          </div>
        </div>
      )}
    </>
  );
}
