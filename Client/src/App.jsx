import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Component/Form/SignUp/Signup";
import Login from "./Component/Form/Login/Login";
import Home from "./Component/Home/Home";
import Topnavbar from "./Component/Navbar/Topnavbar";
import AddProduct from "./Component/Products/AddProduct";
import ManageProduct from "./Component/Products/ManageProduct";
import AddCustomer from "./Component/Customers/AddCustomer";
import ManageCustomer from "./Component/Customers/ManageCustomer";
import AddUser from "./Component/SystemUsers/AddUser";
import Dashboard from "./Component/Dashboard/Dashboard";
import ManageUser from "./Component/SystemUsers/ManageUser";
import ManageInvoice from "./Component/Invoices/ManageInvoice";
import CreateInvoice from "./Component/Invoices/CreateInvoice";
import AddTemplate from "./Component/Templates/AddTemplate";
import ManageTemplate from "./Component/Templates/ManageTemplate";
import Payment from "./Component/PaymentForm/Payment";
import CustomerLogin from "./Component/Form/CustomerLogin/CustomerLogin";
import CustomerSideBar from "./Component/Navbar/CustomerBar/CustomerSideBar";
import CustomerDashboard from "./Component/CusstomerDashboard/CustomerDashboard";
import ServicesList from "./Component/CusstomerDashboard/ServicesList";
import PaymentHistory from "./Component/CusstomerDashboard/PaymentHistory";
import HomeDashboard from "./Component/CusstomerDashboard/HomeDashboard";
import PasswordReset from "./Component/Form/PasswordReset/PasswordReset";

import { Navigate } from "react-router-dom";
import SetPassword from "./Component/Form/PasswordReset/SetPassword";
import InvoicesData from "./Component/CusstomerDashboard/InvoicesData";

// Create a simple private route component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken"); // Example: checking if user is authenticated via token

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div className="h-[100%] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/password-reset/:type" element={<PasswordReset />} />
          <Route path="/confirm/:type/:id" element={<SetPassword />} />

          <Route path="/login/:type" element={<Login />} />
          {/* <Route path="/customer/login" element={<CustomerLogin />} /> */}

          {/* Protected Routes (wrapped in PrivateRoute to ensure authentication) */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="addproduct"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="manageproduct"
              element={
                <PrivateRoute>
                  <ManageProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="addcustomer"
              element={
                <PrivateRoute>
                  <AddCustomer />
                </PrivateRoute>
              }
            />
            <Route
              path="managecustomer"
              element={
                <PrivateRoute>
                  <ManageCustomer />
                </PrivateRoute>
              }
            />
            <Route
              path="adduser"
              element={
                <PrivateRoute>
                  <AddUser />
                </PrivateRoute>
              }
            />
            <Route
              path="manageuser"
              element={
                <PrivateRoute>
                  <ManageUser />
                </PrivateRoute>
              }
            />
            <Route
              path="manageinvoice"
              element={
                <PrivateRoute>
                  <ManageInvoice />
                </PrivateRoute>
              }
            />
            <Route
              path="createinvoice"
              element={
                <PrivateRoute>
                  <CreateInvoice />
                </PrivateRoute>
              }
            />
            <Route
              path="createtemplate"
              element={
                <PrivateRoute>
                  <AddTemplate />
                </PrivateRoute>
              }
            />
            <Route
              path="managetemplate"
              element={
                <PrivateRoute>
                  <ManageTemplate />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="customer"
            element={
              <PrivateRoute>
                <CustomerDashboard />
              </PrivateRoute>
            }
          >
            <Route
              path="invoice/:id"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="invoice"
              element={
                <PrivateRoute>
                  <InvoicesData />
                </PrivateRoute>
              }
            />

            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <HomeDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="paymenthistory"
              element={
                <PrivateRoute>
                  <PaymentHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="servicelist"
              element={
                <PrivateRoute>
                  <ServicesList />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Customer Sidebar (Always accessible) */}
          <Route path="customersidebar" element={<CustomerSideBar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
