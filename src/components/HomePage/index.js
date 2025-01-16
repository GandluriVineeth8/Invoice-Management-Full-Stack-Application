import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    return savedInvoices;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const handleDelete = (id) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    setInvoices(updatedInvoices);
  };

  return (
    <>
      <div className="home">
        <h1>Invoices</h1>
        <button onClick={() => navigate("/invoice-form")}>
          Create New Invoice
        </button>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Client Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.clientName}</td>
                <td>{invoice.date}</td>
                <td>${invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>
                  <button
                    onClick={() => navigate(`/invoice-form/${invoice.id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(invoice.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
