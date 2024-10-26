import React from "react";
import { NavLink } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import { FaPaypal } from "react-icons/fa";
import { FaCcStripe } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";

const Payment = () => {
  return (
    <>
      <div className="flex gap-4">
        <nav className="bg-gray-800 text-white text-start h-screen w-56">
          <h2 className="space-y-2 p-2 pl-4">Payment Option</h2>
          <hr />
          <ul className="space-y-1 p-2">
            <li>
              <NavLink
                to=""
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <FaPaypal className="mr-2" /> Paypal
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <FaCcStripe className="mr-2" /> Stripe
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <FaCcAmazonPay className="mr-2" /> AmazonPay
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <FaCcApplePay className="mr-2" /> ApplePay
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <PaymentForm />
        </div>
      </div>
    </>
  );
};

export default Payment;
