import React, { useEffect, useState } from "react";

import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaClock,
  FaWallet,
  FaBoxes,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../utils/api";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Box = ({ title, icon, bgColor, number }) => (
  <div
    className={`flex flex-col items-left justify-end h-32 w-64 p-4 mt-6 ml-6 ${bgColor} text-white rounded-lg shadow-md`}
  >
    <h1 className="text-4xl font-bold text-start">{number}</h1>
    <div className="flex items-center mt-2">
      <div className="text-3xl mr-2">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  </div>
);

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    invoiceCount: 0,
    customerCount: 0,
    productCount: 0,
  });
  const [pieD, setPieD] = useState([]);
  const piedata = {
    labels: ["Paid Bills", "Pending Bills"],
    datasets: [
      {
        label: "Bills Status",
        data: pieD, // Example counts: 40 paid, 20 pending
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bills Status",
      },
    },
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: [120, 150, 170, 200, 220, 180, 240, 300, 260, 280, 320, 350], // Replace with your data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const getDataDashboard = async () => {
      try {
        const invoiceResponse = await api.get("/invoice/getcount");
        const customerResponse = await api.get("/customer/getcount");
        const productResponse = await api.get("/product/getcount");

        setDashboardData({
          invoiceCount: invoiceResponse.data,
          customerCount: customerResponse.data.totalCount,
          productCount: productResponse.data.totalCount,
        });
        setPieD([
          invoiceResponse.data.paidCount,
          invoiceResponse.data.openCount,
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    getDataDashboard();
  }, []);
  return (
    <>
      {console.log(pieD)}
      <div className="flex flex-wrap justify-start space-x-6 space-y-6">
        <Box
          number="1678"
          title="Sales Amount"
          icon={<FaMoneyBillWave />}
          bgColor="bg-blue-500"
        />
        <Box
          number={dashboardData.invoiceCount.totalCount}
          title="Total Invoices"
          icon={<FaFileInvoiceDollar />}
          bgColor="bg-green-500"
        />
        <Box
          number={dashboardData.invoiceCount.openCount}
          title="Pending Bills"
          icon={<FaClock />}
          bgColor="bg-yellow-500"
        />
        <Box
          number={dashboardData.invoiceCount.paidCount}
          title="Paid Bills"
          icon={<FaCheckCircle />}
          bgColor="bg-gray-500"
        />
        <Box
          number="1200"
          title="Due Amount"
          icon={<FaWallet />}
          bgColor="bg-red-500"
        />
        <Box
          number={dashboardData.productCount}
          title="Total Products"
          icon={<FaBoxes />}
          bgColor="bg-purple-500"
        />
        <Box
          number={dashboardData.customerCount}
          title="Total Customers"
          icon={<FaUsers />}
          bgColor="bg-teal-500"
        />
      </div>
      <div className="justify-evenly w-[100%] flex mt-10">
        <div className="w-1/2">
          <Pie data={piedata} options={pieoptions} />
        </div>
        <div className="w-1/2">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
}
