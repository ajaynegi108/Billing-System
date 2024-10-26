import React, { useState, useEffect } from "react";
import InvoiceTemplate from "../Invoices/InvoiceTemplate";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import api from "../utils/api";

import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_live_51QDcQWLl1L4iwjVQ8xbhROwQCxQYSJMFkEBHjaquRdije0nHgrl2w8Bfne5T1SIH0Ut8ZUHIPMsSUXn3sF64lKMD0058cSJ5Bn"
);

const PaymentForm = () => {
  return <CheckoutForm />;
};

const CheckoutForm = () => {
  const [amount, setAmount] = useState(0); // Set default to 0 for safety
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);
  const { id } = useParams();

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await api.post(
      "/invoice/payment",
      {
        items: [
          {
            price_data: {
              currency: "aud",
              product_data: { name: "Product Name" },
              unit_amount: amount * 100, // Amount in cents (e.g., 20000 = $200.00)
            },
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };
  useEffect(() => {
    const getInvoiceDetails = async () => {
      try {
        const response = await api.get(`invoice/getinvoice/${id}`);
        setInvoiceData(response.data.invoice);
        setAmount(response.data.invoice.totalAmount || 0); // Assuming total is the amount to pay
      } catch (error) {
        console.log(error);
      }
    };

    getInvoiceDetails();
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>

        <button
          type="button"
          onClick={handlePayment}
          // disabled={!stripe}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <InvoiceTemplate />
      </div>
    </>
  );
};

export default PaymentForm;
