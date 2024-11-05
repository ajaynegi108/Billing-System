import React from "react";

export default function ServicesList() {
  const services = [
    { name: "Seo", price: 200 },
    { name: "Website", price: 250 },
  ];
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Services Offered</h2>
      <ul className="mt-2">
        {services.map((service, index) => (
          <li key={index} className="border-b py-2">
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
