import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./Component/Navbar/Sidebar";
import Signup from "./Component/Form/SignUp/Signup";
import Login from "./Component/Form/Login/Login";
import Home from "./Component/Home/Home";
import Navbar from "./Component/Navbar/Topnavbar";
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
import CustomerDashboard from "./Component/Customers/CustomerDashboard";
import Payment from "./Component/PaymentForm/Payment";
import CustomerLogin from "./Component/Form/CustomerLogin/CustomerLogin";
import CustomerSideBar from "./Component/Navbar/CustomerBar/CustomerSideBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
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
            <Route path="customerdashboard" element={<CustomerDashboard />} />
          </Route>
          <Route path="payment/:id" element={<Payment />} />
          <Route path="customerlogin" element={<CustomerLogin />} />
          <Route path="customersidebar" element={<CustomerSideBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
