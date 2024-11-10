import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function InvoicesData() {
  const [invoiceData, setInvoiceData] = useState([]);
  const navigate = useNavigate();
  const getDataInvoices = async () => {
    try {
      const response = await api.get(
        "/customer/getallinvoices?&page=1&limit=10&search=''&sort=''"
      );

      setInvoiceData(response.data.invoices);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataInvoices();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Invalid date string");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  function downloadImage(base64Image, filename) {
    console.log(base64Image);
    const link = document.createElement("a");
    link.href = "data:image/png;base64," + base64Image;
    link.download = filename + ".png";
    link.click();
  }
  return (
    <div className="flex flex-wrap gap-5 justify-start">
      {invoiceData?.map((invoiceData, index) => {
        return (
          <>
            {" "}
            <div className="w-[30%] h-[320px] border-2 transition-transform transform hover:scale-105 hover:outline hover:outline-2 hover:outline-blue-400 hover:shadow-2lg ">
              <div className="overflow-hidden h-[250px]">
                <img
                  src={`data:image/png;base64,${invoiceData?.thumbnail}`}
                  alt="Invoice Thumbnail"
                />
              </div>
              <div
                style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                className="text-xs p-1 bg-red-200 text-red-800 rounded-full w-[70px] text-center"
              >
                {invoiceData?.invoiceStatus}
              </div>

              <div className="p-3 flex justify-between">
                <button
                  className="bg-[#3B82F6] h-[35px] pb-1 w-[90px] text-white"
                  onClick={() => {
                    downloadImage(invoiceData.thumbnail, invoiceData._id);
                  }}
                >
                  Download
                </button>

                <button
                  className="bg-[#3B82F6] mb-10 h-[35px] pb-1 w-[90px] text-white"
                  onClick={() => {
                    navigate(`${invoiceData._id}`);
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
