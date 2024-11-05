import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./Component/Navbar/Sidebar";
import Signup from "./Component/Form/SignUp/Signup";
import Login from "./Component/Form/Login/Login";
import Home from "./Component/Home/Home";
import Topnavbar from "./Component/Navbar/Topnavbar";
import AddProduct from "./Component/Products/AddProduct";
import ManageProduct from "./Component/Products/ManageProduct";
import AddCustomer from "./Component/Customers/AddCustomer";
import ManageCustomer from "./Component/Customers/ManageCustomer";
import AddUser from "./Component/SystemUsers/AddUser";
import "./App.css";
import Dashboard from "./Component/Dashboard/Dashboard";
import ManageUser from "./Component/SystemUsers/ManageUser";
import ManageInvoice from "./Component/Invoices/ManageInvoice";
import CreateInvoice from "./Component/Invoices/CreateInvoice";
// import Invoicedownload from "./Component/Invoices/Invoicedownload";
import InvoiceTemplate from "./Component/Invoices/InvoiceTemplate";

import AddTemplate from "./Component/Templates/AddTemplate";
import ManageTemplate from "./Component/Templates/ManageTemplate";

import Payment from "./Component/PaymentForm/Payment";
import CustomerLogin from "./Component/Form/CustomerLogin/CustomerLogin";
import CustomerSideBar from "./Component/Navbar/CustomerBar/CustomerSideBar";
import CustomerDashboard from "./Component/CusstomerDashboard/CustomerDashboard";
import ServicesList from "./Component/CusstomerDashboard/ServicesList";
import PaymentHistory from "./Component/CusstomerDashboard/PaymentHistory";
import HomeDashboard from "./Component/CusstomerDashboard/HomeDashboard";
function App() {
  return (
    <>
      <div className="h-[100%] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="manageproduct" element={<ManageProduct />} />
              <Route path="addcustomer" element={<AddCustomer />} />
              <Route path="managecustomer" element={<ManageCustomer />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="manageuser" element={<ManageUser />} />
              <Route path="manageinvoice" element={<ManageInvoice />} />
              <Route path="createinvoice" element={<CreateInvoice />} />
              {/* <Route path="invoicedownload" element={<Invoicedownload />} /> */}
              <Route path="createtemplate" element={<AddTemplate />} />
              <Route path="managetemplate" element={<ManageTemplate />} />
            </Route>

            <Route path="payment/:id" element={<Payment />} />
            <Route path="customerlogin" element={<CustomerLogin />} />
            <Route path="/customerdashboard" element={<CustomerDashboard />}>
              <Route path="homedashboard" element={<HomeDashboard />} />
              <Route path="paymenthistory" element={<PaymentHistory />} />
              <Route path="servicelist" element={<ServicesList />} />
            </Route>
            <Route path="customersidebar" element={<CustomerSideBar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
