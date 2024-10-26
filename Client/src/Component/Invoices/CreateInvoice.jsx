import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import Select from "react-select";
import api from "../utils/api";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
export default function CreateInvoice({
  type = "create",
  userId,
  getInvoiceList,
  setIsOpen,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    postcode: "",
    phone: "",
    abn: "",
  });

  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollableRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (scrollableRef.current.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const [invoiceStatus, setInvoiceStatus] = useState("open");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [subtotal, setsubTotal] = useState(0.0);

  // const [discount, setDiscount] = useState(0.0);
  // const [shipping, setShipping] = useState(0.0);

  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [taxAmount, setTaxAmount] = useState(10);

  const [products, setProducts] = useState([
    { name: "", quantity: 0, price: 0.0, discount: 0.0, subtotal: 0.0 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding new field
  const handleAddField = () => {
    setFields((prev) => [...prev, newFieldName]);
    setFormData((prev) => ({ ...prev, [newFieldName]: "" }));
    setNewFieldName("");
    setIsModalOpen(false);
  };

  const handleRemoveField = (fieldName) => {
    setFields((prev) => prev.filter((field) => field !== fieldName));
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[fieldName];
      return newData;
    });
  };

  // Function to handle product changes with discount in percentage
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };

    // Recalculate the subtotal with the discount as a percentage
    const updatedProduct = updatedProducts[index];
    const subtotal =
      updatedProduct.quantity *
      updatedProduct.price *
      (1 - updatedProduct.discount / 100);

    updatedProducts[index].subtotal = subtotal;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        description: "",
        quantity: 1,
        price: 0.0,
        discount: 0.0,
        subtotal: 0.0,
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    // const totalTax = removeTax ? 0 : tax;

    const productTotal = products.reduce(
      (acc, product) => acc + product.subtotal,
      0
    );
    const totalAmount = productTotal;
    setsubTotal(totalAmount);
    return totalAmount;
  };
  useEffect(() => {
    calculateTotal();
  }, [products]);

  const handleSubmit = async () => {
    // Create an object for dynamic fields
    const dynamicFields = fields.reduce((acc, field) => {
      acc[field] = formData[field] || ""; // Get values for dynamic fields from formData
      return acc;
    }, {});

    // Combine static fields and dynamic fields
    const invoiceData = {
      ...formData, // Static fields like name, email, etc.
      dynamicFields, // Dynamic fields (key-value pairs)
      products, // Products array

      invoiceStatus, // Invoice status
      invoiceDate, // Invoice creation date
      dueDate, // Due date

      subtotal,
      totalamount: (subtotal + subtotal * (10 / 100)).toFixed(2),
      tax: taxAmount,
      gst: (subtotal * (10 / 100)).toFixed(2),
    };

    try {
      let response;
      if (type === "update") {
        response = await api.put(`invoice/update/${userId}`, invoiceData);
        toast.success(response.data.message);
        setIsOpen(false);
        getInvoiceList();
        setTimeout(() => {
          navigate("/home/manageinvoice");
        }, 1000);
      } else {
        response = await api.post(`invoice/create`, invoiceData);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/home/manageinvoice");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const searchCustomerList = async (val) => {
    try {
      const response = await api.get(
        `customer/getall?limit=1000&search=${val}`
      );

      const final = response.data.customers.map((val) => {
        return { value: val._id, label: val.name };
      });
      setCustomerList(final);
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false); // Set loading to false when the fetch completes
    }
  };

  const searchProductList = async (val) => {
    try {
      const response = await api.get(`product/getall?limit=1000&search=${val}`);

      const final = response.data.customers.map((val) => {
        return { value: val._id, label: val.name };
      });
      setProductList(final);
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false); // Set loading to false when the fetch completes
    }
  };
  // useEffect(() => {
  //   searchProductList();
  // });

  const getCustomerById = async (id) => {
    try {
      const response = await api.get(`/customer/getcustomer/${id}`);

      setFormData(response.data.customer);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsById = async (id, index) => {
    try {
      const response = await api.get(`/product/getproduct/${id}`);
      const productData = response.data.customer;
      setProducts((prevProducts) => {
        // Create a new array with updated product at the given index
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          name: productData.name || updatedProducts[index].name,
          price: productData.price || updatedProducts[index].price,
          description:
            productData.description || updatedProducts[index].description,
        };
        return updatedProducts;
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getInvoiceById = async () => {
      try {
        const response = await api.get(`/invoice/getinvoice/${userId}`);

        const {
          dynamicFields,
          product,
          gst,
          tax,
          totalAmount,
          subtotal,

          invoiceStatus,
          invoiceDate,
          dueDate,
        } = response.data.invoice;
        setFormData(response.data.invoice);
        setProducts(product);
        const dataArray = Object.entries(dynamicFields);

        setInvoiceStatus(invoiceStatus);
        setInvoiceDate(invoiceDate);
        setDueDate(dueDate);
        setFields(dataArray);
      } catch (err) {
        console.log(err);
      }
    };
    getInvoiceById();
  }, [userId]);
  return (
    <>
      {type !== "update" && (
        <>
          {" "}
          <ToastContainer />
        </>
      )}

      <div
        ref={scrollableRef}
        className="relative h-screen overflow-hidden border "
        onScroll={handleScroll}
        style={{ overflowY: "scroll" }}
      >
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isScrolled ? "opacity-90" : "opacity-100"
          }`}
        >
          <h1 className="text-4xl font-bold m-4">
            {type !== "create" ? "Edit Invoice" : "Create New Invoice"}
          </h1>
          {/* Invoice Type and Details */}
          <div className="w-[100%] mx-auto p-4 flex items-center ">
            <div className="flex items-center w-[100%]">
              {/* <div className="w-[35%] flex items-center">
                <label className="mr-2 text-lg">Select Type:</label>
                <select
                  value={invoiceType}
                  onChange={(e) => setInvoiceType(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-[70%]"
                >
                  <option>Invoice</option>
                  <option>Quote</option>
                  <option>Receipt</option>
                </select>
              </div> */}
              {/* <div className="w-[10%] flex items-center">
                <label className="ml-4 mr-2">Status:</label>
                <select
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-[70%]"
                >
                  <option>open</option>
                  <option>paid</option>
                </select>
              </div> */}

              <div className="w-[50%] flex items-center">
                <label className="ml-4 mr-2">Invoice Date:</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-[70%]"
                  required
                />
              </div>

              <div className="w-[50%] flex items-center">
                <label className="ml-4 mr-2">Due Date:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded  w-[70%]"
                  required
                />
              </div>
              {/* <div className="w-[15%] flex items-center">
                <label className="ml-4 mr-2">Tax:</label>
                <input
                  type="input"
                  value={taxAmount}
                  min="0"
                  onChange={(e) => setTaxAmount(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div> */}
            </div>
          </div>
          {/* Customer Information */}
          <div className="max-w-6xl mx-auto p-4 bg-[#E7E7E7] flex justify-between">
            <h3 className="text-lg font-semibold m-2">Customer Information</h3>

            {/* <p className="m-2">OR Select Existing Customer</p> */}

            <Select
              className="basic-single"
              classNamePrefix="select"
              // defaultValue={customerList}
              isSearchable={true}
              name="customer"
              placeholder="Search and select a customer"
              options={customerList}
              onInputChange={(val) => {
                searchCustomerList(val);
              }}
              onChange={(val) => {
                getCustomerById(val.value);
              }}
              styles={{ container: (base) => ({ ...base, width: "40%" }) }}
            />
          </div>
          {/* Customer Form */}
          <div className="max-w-6xl mx-auto p-4 bg-white shadow-md">
            <form className="space-y-4">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Enter Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="abn"
                  >
                    ABN
                  </label>
                  <input
                    type="number"
                    id="abn"
                    name="abn"
                    placeholder="Enter ABN"
                    value={formData.abn}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="address1"
                  >
                    Address 1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    placeholder="Enter Address 1"
                    value={formData.address1}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="address2"
                  >
                    Address 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    placeholder="Enter Address 2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="city"
                  >
                    Town/City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter Town/City"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="postcode"
                  >
                    Postcode
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    placeholder="Enter Postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                {fields.map((field, index) => (
                  <div className="flex-1/3 w-[32%]" key={index}>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor={field}
                    >
                      {field}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        id={field}
                        name={field}
                        placeholder={`Enter ${field}`}
                        value={formData[field]}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        className="text-red-500 mt-1"
                        onClick={() => handleRemoveField(field)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                Add Field
              </button>
            </form>
          </div>
          {/* Product Table */}
          <div className="max-w-6xl mx-auto p-4 bg-white shadow-md mt-6">
            <table className="min-w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Qty</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Discount (%)
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Sub Total
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 w-[250px]">
                      <Select
                        className="basic-single w-full p-2 focus:outline-none"
                        classNamePrefix="select"
                        // defaultValue={customerList}
                        isSearchable={true}
                        name="product"
                        placeholder="Product Name"
                        options={productList}
                        defaultValue={product.name}
                        styles={{
                          container: (base) => ({ ...base, width: "100%" }),
                        }}
                        onInputChange={(val) => {
                          searchProductList(val);
                        }}
                        onChange={(val) => {
                          getProductsById(val.value, index);
                          handleProductChange(index, "name", val.label);
                        }}
                      />

                      {/* <input
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(index, "name", e.target.value)
                        }
                        className="w-full p-2 focus:outline-none"
                        placeholder="Product Name"
                        required
                      /> */}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={product.description}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 focus:outline-none"
                        placeholder="Product Description"
                        required
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={product.quantity || 0} // Set default value to 0
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "quantity",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full p-2 focus:outline-none"
                        required
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full p-2 focus:outline-none"
                        required
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={product.discount}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "discount",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full p-2 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.subtotal.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="text-red-500 font-bold"
                        >
                          <FaRegTrashAlt />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                type="button"
                onClick={addProduct}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                Add Product
              </button>
            </div>
          </div>
          {/* Additional Notes and Totals */}
          <div className="max-w-6xl mx-auto p-4 bg-white shadow-md mt-6">
            <h3 className="text-lg font-semibold">Additional Notes</h3>
            <div className="flex justify-between mt-2">
              {/* <div>
                <p>Discount: ${discount.toFixed(2)}</p>
                <p>Shipping: ${shipping.toFixed(2)}</p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={removeTax}
                    onChange={() => setRemoveTax(!removeTax)}
                    className="mr-2"
                  />
                  <label>Remove TAX/VAT</label>
                </div>
                <p>TAX/VAT: ${removeTax ? 0 : tax.toFixed(2)}</p>
              </div> */}
              <div className="font-semibold bg-gray-50 p-4 text-right flex justify-between w-[100%]">
                <h3>Sub Total: ${subtotal}</h3>
                <hr className="m-4" />
                <h3>GST: ${(subtotal * (10 / 100)).toFixed(2)}</h3>
                <hr className="m-4" />
                <h3>Total: ${(subtotal + subtotal * (10 / 100)).toFixed(2)}</h3>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Field</h2>
            <input
              type="text"
              placeholder="Field Name"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddField}
              disabled={!newFieldName}
            >
              Add Field
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
